import 'dotenv/config';
import {
  AngularNodeAppEngine,
  createNodeRequestHandler,
  isMainModule,
  writeResponseToNodeResponse,
} from '@angular/ssr/node';
import express from 'express';
import { OAuth2Client } from 'google-auth-library';
import { join } from 'node:path';

const browserDistFolder = join(import.meta.dirname, '../browser');

const app = express();
const angularApp = new AngularNodeAppEngine();
const clienteGoogle = new OAuth2Client();

app.use(express.json());

app.post('/api/auth/google', async (req, res) => {
  const clientId = process.env['GOOGLE_CLIENT_ID'];
  const credential: unknown = req.body?.credential;

  if (!clientId) {
    return res.status(500).json({ error: 'Falta configurar GOOGLE_CLIENT_ID.' });
  }

  if (typeof credential !== 'string' || credential.length === 0) {
    return res.status(401).json({ error: 'La credencial de Google no es válida.' });
  }

  try {
    const ticket = await clienteGoogle.verifyIdToken({
      idToken: credential,
      audience: clientId,
    });
    const payload = ticket.getPayload();

    if (!payload?.sub || !payload.email) {
      return res.status(401).json({ error: 'La credencial de Google no es válida.' });
    }

    return res.json({
      sub: payload.sub,
      name: payload.name ?? '',
      email: payload.email,
      ...(payload.picture ? { picture: payload.picture } : {}),
    });
  } catch {
    return res.status(401).json({ error: 'La credencial de Google no es válida.' });
  }
});

app.use(
  express.static(browserDistFolder, {
    maxAge: '1y',
    index: false,
    redirect: false,
  }),
);

app.use((req, res, next) => {
  angularApp
    .handle(req)
    .then((response) =>
      response ? writeResponseToNodeResponse(response, res) : next(),
    )
    .catch(next);
});

if (isMainModule(import.meta.url) || process.env['pm_id']) {
  const port = process.env['PORT'] || 4000;
  app.listen(port, (error) => {
    if (error) {
      throw error;
    }

    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

export const reqHandler = createNodeRequestHandler(app);

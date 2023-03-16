# warpaint-sound

A hobby project to track sounds of musical instruments on a map around the world.

# Setup

To properly run app:

Suggested folder structure (not present on github **with bold**):

- **.env**
- docker-compose.yml
- README.md
- .gitignore
- frontend/
  - **.env.prod**
- backend/

## Frontend

env variables needed:

for dev:

- RECAPTCHA_SITE_KEY
- BACKEND_URL (eg. http:\\localhost:8002 or domain like https:\\api.warpaintsound.com)
- FRONTEND_URL (eg. http:\\localhost:3001 or domain like https:\\warpaintsound.com)
- WDS_SOCKET_PORT (0 in dev cases)
- WATCHPACK_POLLING=true # replaced: - CHOKIDAR_USEPOLLING=true / to check changes in react

for dev put them in the main .env file beside docker-compose.yml

for prod:

- REACT_APP_RECAPTCHA_SITE_KEY
- REACT_APP_BACKEND_URL
- REACT_APP_FRONTEND_URL

for prod aws static hosting, create a .env.prod file in the frontend project folder and then build with _npm run build_: "build": "env-cmd -f .env.prod react-scripts build" (env-cmd should be installed globally or locally to be able to run it)

## Backend

env variables needed:

for dev:

- ENVIRONMENT=development
- DB_HOST=wpsound_db (or whatever the name of the db instance is from docker-compose) (needed also for pgadmin Add server function (the Host/domain) + password and port as well)
- DB_USER
- DB_PASSWORD
- DB_NAME
- DB_PORT
- DB_DIALECT=postgres
- RECAPTCHA_SECRET_KEY
- TOKEN_KEY (randomly generated characters to make token for admin to keep logged in for a period of time)
- WARPAINTVISION_GMAIL_EMAIL (for sound record reporting email) # google / "dots" / account / security / Signing in to google / App password (2-step should be enabled) / Warpaint Sound
- WARPAINTVISION_GMAIL_PASSWORD
- PGADMIN_EMAIL (choose something for dev like admin@admin.com)
- PGADMIN_PASSWORD (choose anything)
- FRONTEND_URL (eg. http:\\localhost:3001 or domain like https:\\warpaintsound.com)

These should be added to the main .env file

for prod with aws:

- ENVIRONMENT=production
- DB_DIALECT=postgres
- RECAPTCHA_SECRET_KEY
- TOKEN_KEY (randomly generated characters to make token for admin to keep logged in for a period of time)
- WARPAINTVISION_GMAIL_EMAIL (for sound record reporting email)
- WARPAINTVISION_GMAIL_PASSWORD
- AWS_UPLOADS_BUCKET (the name of the bucket where images and audio files are stored)
- AWS_BUCKET_REGION (region of mentioned bucket)
- AWS_ACCESS_KEY (generated access key for IAM user created with policies attached to the bucket to put, get, delete these files)
- AWS_SECRET_KEY (generated secret key for...)
- FRONTEND_URL (eg. http:\\localhost:3001 or domain like https:\\warpaintsound.com)

These should be added to the beanstalk environment instance / configuration / software

for prod if DB is connected with beanstalk, the following env variables are available for nodejs app:

- RDS_HOSTNAME (used instead of DB_HOST in dev)
- RDS_USERNAME (used instead of DB_USER in dev)
- RDS_PASSWORD (used instead of DB_PASSWORD in dev)
- RDS_DB_NAME (used instead of DB_NAME in dev)
- RDS_PORT (used instead of DB_PORT in dev)

Extra setup for backend with ffmpeg:
To be able to run ffmpeg media conversion with npm i fluent-ffmpeg, ffmpeg needs to be installed:

- On docker: npm install @ffmpeg-installer/ffmpeg and for Node images (which uses linux-x64) install extra executable with: npm install @ffmpeg-installer/linux-x64 --force. (This uses linux chmod command, so before that you need git and add C:\Program Files\Git\usr\bin\ to PATH variable). Link: https://github.com/kribblo/node-ffmpeg-installer
  - Cannot find ffmpeg issue: https://github.com/fluent-ffmpeg/node-fluent-ffmpeg/issues/748.
  - ReferenceError: require is not defined in ES module scope, you can use import instead: // These lines make "require" available; import { createRequire } from "module"; const require = createRequire(import.meta.url); // Link: https://www.kindacode.com/article/node-js-how-to-use-import-and-require-in-the-same-file/
  - **!Important**: if you want to install new packages to backend on windows, you should delete temporarily the **"@ffmpeg-installer/linux-x64": "^4.1.0",** line from backend/package.json from dependencies. After installation you can paste it back.
- On local machine: download ffmpeg: https://ffmpeg.org/download.html and from gyandev to .7z file - Unzip it, rename and place folder to C:\ as C:\ffmpeg. Add C:\ffmpeg\bin to PATH variable. Link: https://www.geeksforgeeks.org/how-to-install-ffmpeg-on-windows/

# Deploy

Currently:

- Frontend in S3 bucket, domain setup with Route 53, domain distribution with Cloudfront
- Backend on Elastic Beanstalk, db created connected to it, domain setup with Route 53 and automatic Elastic Load Balancer created with beanstalk instance

To be written in more detail...

Future:

- Frontend: Elastic Container Registry and Elastic Container Service (ECR and ECS) (no free tier)
- Backend: ECR and ECS (no free tier)

# Other

On Frontend:
If you want to present "test" message, paste to App:

<h5
  style={{
    position: 'fixed',
    top: '90%',
    left: '50%',
    transform: 'translateX(-50%)',
    textAlign: 'center',
    zIndex: 5000,
    color: 'red',
  }}
>
  Test phase! All data recorded will be lost.
</h5>

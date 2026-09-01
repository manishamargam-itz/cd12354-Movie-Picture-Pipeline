FROM public.ecr.aws/docker/library/python:3.10-alpine
ENV FLASK_RUN_HOST=0.0.0.0

WORKDIR /
RUN adduser -u 1000 -D app
RUN apk update && \
  apk add \
  pcre \
  openssl \
  libffi \
  && pip install pipenv

RUN mkdir -p /var/www/app && mkdir /app

COPY Pipfile* /app
RUN cd /app && pipenv install --system --deploy

COPY . /app

CMD gunicorn --bind 0.0.0.0:5000 --workers 4 --access-logfile - app:app
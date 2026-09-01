FROM public.ecr.aws/docker/library/python:3.10-alpine
# Trigger CI with properly committed Pipfile.lock
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
RUN cd /app && pipenv install --system

COPY . /app
WORKDIR /app
ENV PYTHONPATH=/app

# Bind on all interfaces so the Kubernetes Service can reach the pod
CMD ["gunicorn", "--bind", "0.0.0.0:5000", "--workers", "2", "--access-logfile", "-", "app:app"]
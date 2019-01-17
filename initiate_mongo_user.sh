#!/bin/bash
mongo --eval "db = db.getSiblingDB('${MONGODB_DATABASE}').createUser({user: '${MONGODB_USER}',pwd: '${MONGODB_PASS}',roles: [{role: 'readWrite', db: '${MONGODB_DATABASE}'}]})"

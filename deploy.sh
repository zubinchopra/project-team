#!/usr/bin/env bash
./build.sh

docker push zubinchopra/info340

export TLSCERT=/etc/letsencrypt/live/info340.zubinchopra.me/fullchain.pem
export TLSKEY=/etc/letsencrypt/live/info340.zubinchopra.me/privkey.pem

ssh -i ~/.ssh/id_rsa ec2-user@35.155.148.69 << EOF

    docker rm -f info340
    docker pull zubinchopra/info340

    docker run -d \
    --name info340 \
    -e TLSCERT=$TLSCERT \
    -e TLSKEY=$TLSKEY \
    -v /etc/letsencrypt:/etc/letsencrypt:ro \
    -p 443:443 -p 80:80 \
    zubinchopra/info340

EOF
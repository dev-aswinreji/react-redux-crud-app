FROM archlinux:latest 

RUN pacman-key --init && \ 
    pacman -Syu --noconfirm && \ 
    pacman -S --noconfirm nodejs yarn git postgresql && \
    postgresql -D initDB /var/lib/postgres/data

WORKDIR /app

COPY package.json yarn.lock /app/

RUN yarn install 

COPY . /app/

EXPOSE 5713

RUN yarn run dev 

CMD ["yarn","preview"]




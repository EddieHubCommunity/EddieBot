import { User, PartialUser } from 'discord.js';
import * as firebase from 'firebase-admin';

import { db } from './firebase';

interface Event {
  type: string;
  author: User | PartialUser;
}

export const eventStream = async (event: Event) => {
  if (event.author.bot) {
    return;
  }

  await db.collection('eventStream').doc().create({
    avatar: event.author.avatarURL(),
    username: event.author.username,
    type: event.type,
    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
  });
};

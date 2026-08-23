'use client';

import { FirestorePermissionError } from './errors';

type Listener = (error: FirestorePermissionError) => void;

/**
 * A simple event emitter for centralizing Firebase errors.
 */
class FirebaseEventEmitter {
  private listeners = new Set<Listener>();

  emit(event: 'permission-error', error: FirestorePermissionError) {
    if (event === 'permission-error') {
      this.listeners.forEach(l => l(error));
    }
    return true;
  }

  on(event: 'permission-error', listener: Listener) {
    this.listeners.add(listener);
    return this;
  }

  off(event: 'permission-error', listener: Listener) {
    this.listeners.delete(listener);
    return this;
  }
}

export const errorEmitter = new FirebaseEventEmitter();

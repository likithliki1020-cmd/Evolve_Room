'use client';

import React, { useMemo } from 'react';
import { initializeFirebase } from './index';
import { FirebaseProvider } from './provider';
import { FirebaseErrorListener } from '@/components/firebase-error-listener';

/**
 * A client-side wrapper that initializes Firebase and provides the context.
 */
export function FirebaseClientProvider({ children }: { children: React.ReactNode }) {
  const { app, db, auth } = useMemo(() => initializeFirebase(), []);

  return (
    <FirebaseProvider app={app} db={db} auth={auth}>
      <FirebaseErrorListener />
      {children}
    </FirebaseProvider>
  );
}

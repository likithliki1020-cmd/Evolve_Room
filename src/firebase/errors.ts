'use client';

export type SecurityRuleContext = {
  path: string;
  operation: 'get' | 'list' | 'create' | 'update' | 'delete' | 'write';
  requestResourceData?: any;
};

/**
 * A specialized error class for handling Firestore permission errors.
 * This surfaces rich context for debugging Security Rules in development.
 */
export class FirestorePermissionError extends Error {
  context: SecurityRuleContext;

  constructor(context: SecurityRuleContext) {
    super(`Missing or insufficient permissions: ${context.operation} at ${context.path}`);
    this.name = 'FirestorePermissionError';
    this.context = context;
  }
}

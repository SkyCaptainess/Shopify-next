import { Document } from '@contentful/rich-text-types';

export interface Page {
  fields: {
    title: string;
    slug: string;
    description: Document;
  };
}

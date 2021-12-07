import React from 'react';
import { GetStaticPropsContext, InferGetStaticPropsType } from 'next';
import Error from 'next/error';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { BLOCKS } from '@contentful/rich-text-types';

import client from '../lib/contentful-client';
import { Page as PageType } from '../types';

const Page = ({ page }: InferGetStaticPropsType<typeof getStaticProps>) => {
  const renderOptions = {
    renderNode: {
      // eslint-disable-next-line react/display-name
      [BLOCKS.PARAGRAPH]: (__: any, children: React.ReactNode) => {
        return <p className="mb-2">{children}</p>;
      },
    },
  };

  if (!page) {
    return <Error statusCode={404} />;
  }

  return (
    <div className="container mx-auto mt-6">
      <div className="bg-white p-4">
        <h1 className="text-2xl font-semibold mb-4">{page.fields.title}</h1>
        <div className="whitespace-pre-wrap">
          {documentToReactComponents(page.fields.description, renderOptions)}
        </div>
      </div>
    </div>
  );
};

export default Page;

export async function getStaticProps({ params }: GetStaticPropsContext<{ page: string }>) {
  const slug = params?.page;

  const res = await client.getEntries({
    content_type: 'pages',
    'fields.slug': slug,
    limit: 1,
  });

  const page: PageType | null = res.items.length ? res.items[0] : null;

  return {
    props: {
      page,
    },
    revalidate: 60 * 60,
  };
}

export async function getStaticPaths() {
  const res = await client.getEntries({ content_type: 'pages' });
  const paths = res.items.map((item: PageType) => ({
    params: {
      page: item.fields.slug,
    },
  }));

  return {
    paths,
    fallback: 'blocking',
  };
}

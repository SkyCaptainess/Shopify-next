import React from 'react';
import { Button } from '../../ui';

const NewsLetter = () => {
  return (
    <>
      <form>
        <div className="flex flex-wrap items-center">
          <input
            type="text"
            placeholder="Your email"
            className="mr-1 p-2 rounded mt-2"
          />
          <Button size="md" className="mt-2">
            Subscribe
          </Button>
        </div>
      </form>
    </>
  );
};

export default NewsLetter;

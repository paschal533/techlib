import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { client } from '../client';
import { feedQuery, searchQuery } from '../utils/data';
import MasonryLayout from './MasonryLayout';
import Spinner from './Spinner';

const Feed = ({ user }) => {
  const [pins, setPins] = useState();
  const [loading, setLoading] = useState(false);
  const { categoryId, userId } = useParams();

  useEffect(() => {
    if (categoryId) {
      setLoading(true);
      const query = searchQuery(categoryId);
      client.fetch(query).then((data) => {
        setPins(data);
        setLoading(false);
      });
    } else {
      setLoading(true);

      client.fetch(feedQuery).then((data) => {
        setPins(data);
        setLoading(false);
      });
    }
  }, [categoryId]);
  const ideaName = categoryId || 'new';
  if (loading) {
    return (
      <Spinner message={`We are adding ${ideaName} ideas to your feed!`} />
    );
  }

  return (
    <div>
      {!categoryId && !userId ? (
        <div>
          <section className="lg:2/6 text-left my-4">
            <div className="text-6xl font-semibold text-gray-900 leading-none">Grow your career as a developer</div>
            <div className="mt-6 text-xl font-light text-true-gray-500 antialiased">Learn programming and web development the easy way! Get unlimited access to all of our Ebooks.</div>
            <div className="mt-3 sm:mt-4 flex lg:justify-start">
              <div className="rounded-md shadow">
                <Link to={`user-profile/${user?._id}`} className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10">
                  Get started
                </Link>
              </div>
            </div>
          </section>
        </div>
      ) : null}
      {pins && (
        <MasonryLayout pins={pins} />
      )}
    </div>
  );
};

export default Feed;

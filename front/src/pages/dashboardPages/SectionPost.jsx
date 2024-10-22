import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { usePostStore } from '../../store/postStore';
import Post from '../../components/Post';

const SectionPost = () => {
  const { sectionhead, section } = useParams();
  const {
    sectionPosts,
    fetchSectionPosts,
    isLoading,
    error,
    listenForPostLikes,
    likePost,
  } = usePostStore();

    useEffect(() => {
      fetchSectionPosts(sectionhead, section);
      listenForPostLikes();
    }, [sectionhead, section, fetchSectionPosts, listenForPostLikes]);
  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="mt-6 mb-16 overflow-y-auto h-[calc(100vh-100px)] custom-scrollbar">
        {isLoading && <p>Loading posts...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {!isLoading && sectionPosts.length === 0 && (
          <p>No trending posts available.</p>
        )}
        {!isLoading &&
          sectionPosts.length > 0 &&
          sectionPosts.map((post) => (
            <Post key={post._id} post={post} likePost={likePost} />
          ))}
      </div>
    </div>
  );
}

export default SectionPost

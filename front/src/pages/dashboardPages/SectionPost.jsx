import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { usePostStore } from "../../store/postStore";
import Post from "../../components/Post.jsx";

const SectionPost = () => {
  const { sectionhead, section } = useParams();
  const {
    sectionPosts,
    fetchSectionPosts,
    listenForPostLikes,
    likePost,
    isLoading,
    error,
    following,
    toggleFollow,
  } = usePostStore();

  const user = {
    id: "1",
    name: "John Doe",
    username: "johndoe",
  };

  const isFollowing = Array.isArray(following) && following.includes(user.id);

  useEffect(() => {
    fetchSectionPosts(sectionhead, section);
    listenForPostLikes();
  }, [sectionhead, section, fetchSectionPosts, listenForPostLikes]);

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div
        className="h-32 bg-teal-100 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1457369804613-52c61a468e7d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHJhbmRvbXxlbnwwfHwwfHx8MA%3D%3D')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      ></div>

      <div className="flex items-center justify-between p-4 border-b border-gray-300">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center overflow-hidden relative">
            <img
              src="https://images.unsplash.com/photo-1493612276216-ee3925520721?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fHJhbmRvbXxlbnwwfHwwfHx8MA%3D%3D"
              className="object-cover transition-transform duration-300 ease-in-out transform hover:scale-150"
            />
          </div>
          <div>
            <h3 className="text-lg font-semibold uppercase">{sectionhead}</h3>
            <p className="text-sm text-gray-500">
              Public
              <span className="mx-1">•</span>@{section}
            </p>
          </div>
        </div>

        <button
          className={`py-2 px-4 rounded-2xl font-medium ${
            isFollowing
              ? "bg-red-300 text-black hover:bg-red-400"
              : "bg-lostSouls text-white hover:bg-lostSouls"
          }`}
          onClick={() => toggleFollow(user.id)}
        >
          {isFollowing ? "Unfollow" : "Follow"}
        </button>
      </div>

      <div className="mt-6 mb-16 overflow-y-auto h-[calc(100vh-100px)] custom-scrollbar">
        {isLoading && <p>Loading posts...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {!isLoading && sectionPosts.length === 0 && (
          <p>No posts available in this section.</p>
        )}
        {!isLoading &&
          sectionPosts.map((post) => (
            <Post key={post._id} post={post} likePost={likePost} />
          ))}
      </div>
    </div>
  );
};

export default SectionPost;

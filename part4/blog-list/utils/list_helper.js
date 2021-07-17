const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  return blogs.reduce((acc, cur) => {
    return acc + cur.likes;
  }, 0);
};

const favoriteBlog = (blogs) => {
  const favorite = blogs.reduce((acc, cur) => {
    if (cur.likes > acc.likes) {
      return (acc = cur);
    }
  });

  return {
    title: favorite.title,
    author: favorite.author,
    likes: favorite.likes,
  };
};

const mostBlogs = (blogs) => {
  let authors = [];
  for (let blog of blogs) {
    const index = authors.findIndex((author) => author.author === blog.author);
    // If not already in array add new author
    if (index === -1) {
      authors.push({ author: blog.author, blogs: 1 });
      // If already in array add one to number of blogs
    } else {
      authors[index].blogs += 1;
    }
  }
  // Sort from most blogs to least
  return authors.sort((a, b) => {
    return b.blogs - a.blogs;
  })[0];
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
};

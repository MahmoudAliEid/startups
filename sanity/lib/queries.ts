import { defineQuery } from "next-sanity";

export const STARTUP_QUERY = defineQuery(`
  *[_type == "startup" && defined(slug.current) && !defined($search) || title match $search || category match $search || author->name match $search] | order(_createdAt desc) {
    _id,
    title,
    image,
    slug,
    description,
    category,
    _createdAt,
    _type,
    _updatedAt,
    _rev,
    "author": author->{
      _id, 
      name, 
      image, 
      bio
    },
    views
  }
`);

export const FIND_BY_ID_QUERY = defineQuery(`
  *[_type == "startup" && _id == $id][0] {
    _id,
    title,
    image,
    slug,
    description,
    category,
    _createdAt,
    "author": author->{
      _id, 
      name, 
      image, 
      bio,username
    },
    views,
    pitch
  }
`);

export const STARTUP_VIEW_QUERY = defineQuery(`
  *[_type == "startup" && _id == $id][0] {
    _id,
    views
  }
`);

export const Author_BY_GITHUB_QUERY = defineQuery(`
  *[_type == "author" && id == $id][0] {
    _id,
    id,
    name,
    image,
    bio
  }
`);

export const USER_BY_ID_QUERY = defineQuery(`
  *[_type == "author" && _id == $id][0] {
    _id,
    id,
    name,
    image,
    bio,username
  }
`);

export const STARTUP_QUERY_BY_AUTHOR = defineQuery(`
  *[_type == "startup" && author._ref == $id] | order(_createdAt desc) {
    _id,
    title,
    image,
    slug,
    description,
    category,
    _createdAt,
    _type,
    _updatedAt,
    _rev,
    "author": author->{
      _id, 
      name, 
      image, 
      bio
    },
    views
  }
`);

export const PLAYLIST_BY_SLUG_QUERY =
  defineQuery(`*[_type == "playlist" && slug.current == $slug][0]{
  _id,
  title,
  slug,
  select[]->{
    _id,
    _createdAt,
    title,
    slug,
    author->{
      _id,
      name,
      slug,
      image,
      bio
    },
    views,
    description,
    category,
    image,
    pitch
  }
}`);

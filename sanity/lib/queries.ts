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
      bio
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
  *[_type == "author" && _id == $id][0] {
    _id,
    id,
    name,
    image,
    bio
  }
`);

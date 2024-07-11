import React from "react";

type PageProps = {
  params: {
    slug: string[];
  };
};

export default function Page({ params: { slug } }: PageProps) {
  const [courseId] = slug;

  return <div>Course: {courseId}</div>;
}

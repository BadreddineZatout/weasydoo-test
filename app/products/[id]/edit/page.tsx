import React from "react";

export default async function Page({ params }: { params: { id: number } }) {
  return <div>{params.id}</div>;
}

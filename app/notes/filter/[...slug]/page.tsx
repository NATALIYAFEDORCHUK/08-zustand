import NotesClient from "./Notes.client";
import { fetchNotes } from "@/lib/api";
import { Metadata } from "next";

type NotesPageProps = {
  params: Promise<{ slug: string[] }>;
};

export async function generateMetadata({
  params,
}: NotesPageProps): Promise<Metadata> {
  const { slug } = await params;
  const tag = slug[0];

  return {
    title: `Notes: ${tag}`,
    description: `${tag} notes list`,
    openGraph: {
      title: `Notes: ${tag}`,
      description: `${tag} notes list`,
      url: "https://08-zustand-theta-nine.vercel.app/",
      images: [
        {
          url: `https://ac.goit.global/fullstack/react/notehub-og-meta.jpg`,
          width: 1200,
          height: 630,
          alt: "note",
        },
      ],
      type: "article",
    },
  };
}

export default async function NotesTag({ params }: NotesPageProps) {
  const { slug } = await params;
  const tag: string = slug[0];
  const initialData = await fetchNotes({
    query: "",
    page: 1,
    ...(tag && tag !== "All" && { tag }),
  });

  return <NotesClient initialData={initialData} tag={tag} />;
}

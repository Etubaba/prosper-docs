"use client";
import BackDrop from "@/components/common/BackDrop";
import { ParamsId } from "@/interface";
import { useAuthStore, useShareDoc } from "@/store";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

type shareDocParams = {
  doc_id?: string;
};
const page = ({ searchParams }: { searchParams: shareDocParams }) => {
  const { doc_id } = searchParams;
  const isLoggedIn = useAuthStore((state) => state._xnjdkk);
  const setDocId = useShareDoc((state) => state.storeId);
  const router = useRouter();

  useEffect(() => {
    if (!isLoggedIn) {
      setDocId(doc_id);
      router.push(`/auth/login?share_doc=${doc_id}`);
    } else {
      router.push(`/document/${doc_id}`);
    }
  }, []);

  return (
    <div>
      <BackDrop />
    </div>
  );
};

export default page;

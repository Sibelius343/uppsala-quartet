import {  NextPage } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
import AddEventForm from "../components/AddEventForm";
import useAdminContext from "../hooks/useAdminContext";

const AddEvent: NextPage = () => {
  const [isMounted, setIsMounted] = useState(false);
  const { isAdmin } = useAdminContext();

  useEffect(() => {
    setIsMounted(true);
  },[])

  return (
    <>
      <Head>
        <title>Add Event</title>
      </Head>
      {(isMounted && isAdmin) && <AddEventForm />}
    </>
  )
}

export default AddEvent;
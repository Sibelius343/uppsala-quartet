import { NextPage } from "next";
import Head from "next/head";
import AddEventForm from "../components/AddEventForm";
import useAdminContext from "../hooks/useAdminContext";

const AddEvent: NextPage = () => {
  const { isAdmin } = useAdminContext();

  return (
    <>
      <Head>
        <title>Add Event</title>
      </Head>
      {isAdmin && <AddEventForm />}
    </>
  )
}

export default AddEvent;
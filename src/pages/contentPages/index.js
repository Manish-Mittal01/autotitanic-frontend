import React, { useEffect } from "react";
import { handleApiRequest } from "../../services/handleApiRequest";
import { getPageContent } from "../../redux/contentPages/thunk";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Button } from "react-bootstrap";

export default function ContentPage() {
  const { pageId } = useParams();
  const { pageContent } = useSelector((state) => state.contentPage);

  const handlePageContent = async () => {
    await handleApiRequest(getPageContent, pageId);
  };

  useEffect(() => {
    handlePageContent();
  }, [pageId]);

  //   console.log("pageContent", pageContent);

  return (
    <>
      <section>
        <div className="contentPageHeadingWraper">
          <Button variant="danger my-3">{pageContent.data?.page}</Button>
          <div />
        </div>
        <div dangerouslySetInnerHTML={{ __html: pageContent.data?.description }} />
      </section>
    </>
  );
}

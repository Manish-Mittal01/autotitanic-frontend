import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllPrompts } from "../../redux/admin/prompts/thunk";
import { getAllScripts } from "../../redux/admin/scripts/thunk";
import { handleApiRequest } from "../../services/handleApiRequest";
import { logData } from "../../services/logService";
import { generateScript } from "../../redux/user/userScripts/thunk";
import { scriptGenerationAction } from "../../redux/user/userScripts/slice";

const ProductSidebar = () => {
  const dispatch = useDispatch();
  const { allPrompts } = useSelector((state) => state.prompts);
  const { allScripts } = useSelector((state) => state.scripts);
  const { productDetails } = useSelector((state) => state.products);
  const { scriptDetails } = useSelector((state) => state.userScripts);

  const [allfetchedScripts, setAllfetchedScripts] = useState([]);
  const [allfetchedPrompts, setAllfetchedPrompts] = useState([]);
  const [scriptsPaginationDetails, setScriptsPaginationDetails] = useState({
    page: 1,
    limit: 30,
  });
  const [promptsPaginationDetails, setPromptsPaginationDetails] = useState({
    page: 1,
    limit: 10,
  });

  const handleAllPrompts = async () => {
    const response = await handleApiRequest(getAllPrompts, promptsPaginationDetails, false);
  };

  const handleAllScripts = async () => {
    const response = await handleApiRequest(getAllScripts, scriptsPaginationDetails, false);
  };

  const loadMoreScripts = () => {
    setScriptsPaginationDetails((prev) => {
      return {
        ...prev,
        page: prev.page + 1,
      };
    });
  };

  const loadMorePrompts = () => {
    setPromptsPaginationDetails((prev) => {
      return {
        ...prev,
        page: prev.page + 1,
      };
    });
  };

  const handleGenerateScript = async () => {
    // setShowScriptDetails({ action: 2 });

    const request = {
      scriptId: scriptDetails.script?.id,
      productId: scriptDetails.script?.productId,
    };
    dispatch(scriptGenerationAction({ action: 2 }));

    const response = await handleApiRequest(generateScript, request);
    if (response.isSuccess) {
      dispatch(scriptGenerationAction({ action: 3 }));
    } else {
      dispatch(scriptGenerationAction(null));
    }

    // console.log("response", response);
  };

  useEffect(() => {
    handleAllPrompts();
  }, [promptsPaginationDetails]);

  useEffect(() => {
    handleAllScripts();
  }, [scriptsPaginationDetails]);

  useEffect(() => {
    if (allScripts.items) {
      if (scriptsPaginationDetails.page === 1) {
        setAllfetchedScripts((prev) => [...allScripts.items]);
      } else {
        setAllfetchedScripts((prev) => [...prev, ...allScripts.items]);
      }
    }
  }, [allScripts]);

  useEffect(() => {
    if (allPrompts.items) {
      if (promptsPaginationDetails.page === 1) {
        setAllfetchedPrompts((prev) => [...allPrompts.items]);
      } else {
        setAllfetchedPrompts((prev) => [...prev, ...allPrompts.items]);
      }
    }
  }, [allPrompts]);

  // console.log("allPrompts", allPrompts);
  // console.log("allScripts", allScripts);
  // console.log("allfetchedScripts", allfetchedScripts);
  // console.log("allfetchedPrompts", allfetchedPrompts);
  // logData("showScriptDetails", showScriptDetails);
  // logData("scriptDetails", scriptDetails);

  return (
    <>
      <aside id="sidebar" className="sidebar">
        <p className="text-primary fw-bold border-bottom">
          <i className="bi bi-stars" /> Try different copy &amp; style:
        </p>
        <div className="accordion accordion-flush" id="accordionFlushExample">
          {allfetchedPrompts?.map((prompt) => (
            <div key={prompt.id} className="accordion-item">
              <h2 className="accordion-header" id={`flush-0`}>
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target={`#flush-collapse${prompt.id}`}
                  aria-expanded="false"
                  aria-controls="flush-collapseOne"
                >
                  <i className="bi bi-card-text me-2" /> {prompt.title}
                </button>
              </h2>
              <div
                id={`flush-collapse${prompt.id}`}
                className="accordion-collapse collapse  ps-2"
                aria-labelledby="flush-heading0"
                data-bs-parent="#accordionFlushExample"
              >
                <div className="accordion-body">
                  {prompt.sections?.map((section) => (
                    <div key={section.id} className="accordion accordion-flush" id="accordion-sub">
                      <div className="accordion-item">
                        <h2 className="accordion-header" id="subflush-0">
                          <button
                            className="accordion-button collapsed"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target={`#subflush-collapse${section.id}`}
                            aria-expanded="false"
                            aria-controls="flush-collapseOne"
                          >
                            <small className="fw-bold ">{section.name}</small>
                          </button>
                        </h2>
                      </div>
                      <div
                        id={`subflush-collapse${section.id}`}
                        className="accordion-collapse collapse"
                        aria-labelledby="subflush-heading0"
                        data-bs-parent="#accordion-sub"
                      >
                        <ul className="list-group border-0">
                          {allfetchedScripts?.map(
                            (script) =>
                              script.promptSection?.name === section.name && (
                                <li
                                  key={script.id}
                                  className="list-group-item px-0 border-0 d-flex justify-content-between align-items-start"
                                >
                                  <div className="ms-2 me-auto pointer w-50 left">
                                    <div style={{ fontSize: 14 }}>
                                      <small className="badge bg-primary rounded-pill">New</small>
                                      <p className="scriptTitle textEllipses mb-0">
                                        {script.title}
                                      </p>
                                      <i
                                        className="bi bi-info-circle-fill text-muted"
                                        data-bs-toggle="tooltip"
                                        data-bs-placement="top"
                                        title={script.description}
                                      />
                                    </div>
                                  </div>
                                  <div className="right d-flex align-items-center gap-10 w-50 justify-content-end pt-3">
                                    <small className="badge bg-light text-primary rounded-pill">
                                      {script.price} Credit(s)
                                    </small>
                                    <p
                                      className="m-0 btn-sm btn btn-light border-primary text-primary rounded-circle"
                                      onClick={() => {
                                        dispatch(
                                          scriptGenerationAction({
                                            action: 1,
                                            script: {
                                              ...script,
                                              productId: productDetails.data?.id,
                                              product: productDetails.data?.name,
                                            },
                                          })
                                        );

                                        // setShowScriptDetails({
                                        //   action: 1,
                                        //   script: {
                                        //     ...script,
                                        //     productId: productDetails.data?.id,
                                        //     product: productDetails.data?.name,
                                        //   },
                                        // })
                                      }}
                                    >
                                      <i className="bi bi-play-fill text-primary" />
                                    </p>
                                  </div>
                                </li>
                              )
                          )}
                        </ul>
                        <div
                          className="text-center bg-light text-muted rounded pointer"
                          onClick={loadMoreScripts}
                        >
                          <small>Load More</small>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
          <div
            className="text-center bg-light text-muted rounded pointer"
            onClick={loadMorePrompts}
          >
            <small>Load More</small>
          </div>
        </div>
      </aside>
    </>
  );
};

export default ProductSidebar;

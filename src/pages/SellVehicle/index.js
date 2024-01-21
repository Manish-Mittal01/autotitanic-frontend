import React, { useEffect, useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import CKEditor from "react-ckeditor-component";
import HeroAdd from "../../components/heroSection/heroAdd";
import SelectBox from "../../components/selectBox";
import Asterik from "../../components/common/asterik";
import { categories, preventMinus } from "../../utils";
import { handleApiRequest } from "../../services/handleApiRequest";
import { getAllCity, getAllCountry } from "../../redux/countryAndCity/thunk";
import { postFeatures } from "../../utils/filters";
import { getAllMake, getAllModel, getAllVariant } from "../../redux/makeAndModel/thunk";
import { addVehicle } from "../../redux/vehicles/thunk";
import { errorMsg, successMsg } from "../../utils/toastMsg";
import { uploadFile } from "../../redux/common/thunk";
import { useNavigate } from "react-router-dom";

const files = [
  {
    url: "https://firebasestorage.googleapis.com/v0/b/autotitanic-fde97.appspot.com/o/autotitanic%2FScreenshot%20(48).png%2F1704943169423?alt=media&token=06f46508-a8f8-4f61-9c83-9bd9332c34fb",
    type: "image/png",
  },
  {
    url: "https://firebasestorage.googleapis.com/v0/b/autotitanic-fde97.appspot.com/o/autotitanic%2FScreenshot%20(51).png%2F1704943175678?alt=media&token=06da3ab6-4e9e-4e11-964a-75f5087a8796",
    type: "image/png",
  },
  {
    url: "https://firebasestorage.googleapis.com/v0/b/autotitanic-fde97.appspot.com/o/autotitanic%2FScreenshot%20(52).png%2F1704943180559?alt=media&token=77d5e4db-27f8-4df2-a9bd-c8e745ff63a9",
    type: "image/png",
  },
  {
    url: "https://firebasestorage.googleapis.com/v0/b/autotitanic-fde97.appspot.com/o/autotitanic%2FScreenshot%20(53).png%2F1704943182969?alt=media&token=80932fb7-e628-494b-95a0-47fe1f659baa",
    type: "image/png",
  },
  {
    url: "https://firebasestorage.googleapis.com/v0/b/autotitanic-fde97.appspot.com/o/autotitanic%2FScreenshot%20(54).png%2F1704943189097?alt=media&token=802c7914-eaf0-4438-a9d4-e6832dfa118c",
    type: "image/png",
  },
  {
    type: "video/mp4",
  },
];

export default function SellVehicle() {
  const navigate = useNavigate();
  const { allMakes, allModels, allVariants } = useSelector((state) => state.makeAndModel);

  const [postUploadStep, setPostUploadStep] = useState(1);
  const [postDetails, setPostDetails] = useState({ media: [] });
  const [featuresList, setFeaturesList] = useState(postFeatures);

  const handleChange = (name, value) => {
    if (name === "make")
      setPostDetails((prev) => ({ ...prev, [name]: value, model: "", variant: "" }));
    else if (name === "model") setPostDetails((prev) => ({ ...prev, [name]: value, variant: "" }));
    else setPostDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleMakeList = async () => {
    handleApiRequest(getAllMake);
  };

  const handleModelList = async () => {
    handleApiRequest(getAllModel, postDetails.make?.value);
  };

  const handleVariantList = async () => {
    handleApiRequest(getAllVariant, postDetails.model?.value);
  };

  const handleCreatePost = async () => {
    console.log("postDetails", postDetails);
    const request = { ...postDetails };

    const allKeys = featuresList.map((elem) => elem.value);
    allKeys.push("price", "mileage", "description", "currency", "title", "type");

    for (let key of allKeys) {
      if (!postDetails[key]) return errorMsg(`${key} is required`);
      if (key !== "media" && key !== "description") {
        request[key] = postDetails[key]?.value || postDetails[key]?._id;
      }
    }

    const response = await handleApiRequest(addVehicle, request);
    if (response.status) {
      successMsg("Post created!!");
      navigate("/home");
    }
  };

  useEffect(() => {
    handleMakeList();
  }, []);

  useEffect(() => {
    if (allMakes.data && postDetails.make) handleModelList();
    if (allModels.data && postDetails.model) handleVariantList();
  }, [postDetails.make, postDetails.model]);

  useEffect(() => {
    const oldFilters = [...featuresList];
    const makeIndex = oldFilters.findIndex((elem) => elem.label === "Make");
    const modelIndex = oldFilters.findIndex((elem) => elem.label === "Model");
    const variantIndex = oldFilters.findIndex((elem) => elem.label === "Variant");

    if (allMakes.data) {
      oldFilters[makeIndex].options = allMakes.data?.items;
    }
    if (postDetails.make && allModels.data) {
      oldFilters[modelIndex].options = allModels.data.items;
    }
    if (postDetails.model && allVariants.data) {
      oldFilters[variantIndex].options = allVariants.data.items;
    }

    setFeaturesList(oldFilters);
  }, [allMakes, allModels, allVariants]);

  // console.log("postDetaiosl", postDetails);

  return (
    <>
      <section>
        <HeroAdd />

        <Row className="sellVehicleFeatureContainer mx-2 justify-content-center">
          <div className="my-3  d-flex justify-content-center align-items-center">
            <h4 className="m-0 my-2">Car details</h4>
          </div>
          {postUploadStep === 1 ? (
            <PostStepOne
              postDetails={postDetails}
              setPostDetails={setPostDetails}
              setPostUploadStep={setPostUploadStep}
            />
          ) : (
            <>
              <Col xs={12}>
                <label htmlFor="" className="form-label mb-0">
                  Title
                </label>
                <div className="input-group has-validation">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter title"
                    name="title"
                    maxLength={100}
                    value={postDetails.title?.value || ""}
                    onChange={(e) =>
                      handleChange("title", { value: e.target.value, label: e.target.value })
                    }
                  />
                </div>
              </Col>
              {featuresList.map(
                (filter, i) =>
                  i > 1 &&
                  Array.isArray(filter.options) && (
                    <Col key={filter.value} md={6} className="my-2">
                      <label className="">
                        <span className="">
                          {filter.label}
                          <Asterik />
                        </span>
                      </label>
                      <SelectBox
                        options={filter.options}
                        value={postDetails[filter.value]}
                        getOptionLabel={(option) => option.label || option.name}
                        getOptionValue={(option) => option.value || option._id}
                        onChange={(selected) => {
                          const value = {
                            value: selected.value || selected._id,
                            label: selected.label || selected.name,
                          };
                          handleChange(filter.value, value);
                        }}
                      />
                    </Col>
                  )
              )}
              <Col md={6}>
                <label htmlFor="" className="form-label mb-0">
                  Mileage (per mile)
                  <Asterik />
                </label>
                <div className="input-group has-validation">
                  <input
                    type="number"
                    className="form-control"
                    placeholder="Enter Mileage"
                    name="mileage"
                    value={postDetails.mileage?.value || ""}
                    min={0}
                    onKeyDown={preventMinus}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (value.length > 6) return;
                      handleChange("mileage", { value: value, label: value });
                    }}
                  />
                </div>
              </Col>
              <Col md={6}>
                <label htmlFor="" className="form-label mb-0">
                  Price
                  <Asterik />
                </label>
                <div className="input-group has-validation">
                  <input
                    type="number"
                    className="form-control"
                    placeholder="Enter Price"
                    name="price"
                    value={postDetails.price?.value || ""}
                    min={0}
                    onKeyDown={preventMinus}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (value.length > 10) return;
                      handleChange("price", { value: value, label: value });
                    }}
                  />
                </div>
              </Col>

              <Col xs={12}>
                <label htmlFor="" className="form-label mb-0">
                  Description
                </label>
                <div className="input-group has-validation">
                  <CKEditor
                    activeClass="p10 w-100"
                    content={postDetails.description}
                    events={{
                      change: (e) => {
                        console.log("first", e.editor.getData());
                        const textCount = e.editor
                          .getData()
                          .replace(/<[^>]*>/g, "")
                          .replace(/\n/g, "").length;
                        console.log(
                          "length",
                          e.editor.getData().replace(/<[^>]*>/g, ""),
                          textCount
                        );

                        setPostDetails((prev) => {
                          return {
                            ...prev,
                            description: e.editor.getData(),
                          };
                        });
                      },
                    }}
                  />
                </div>
              </Col>
              <Col className="my-2">
                <Button variant="danger" onClick={handleCreatePost}>
                  Post Advert
                </Button>
              </Col>
            </>
          )}
        </Row>
      </section>
    </>
  );
}

export const PostStepOne = ({ postDetails, setPostDetails, setPostUploadStep }) => {
  const { allCountries, allCities } = useSelector((state) => state.countryAndCity);
  const [localImages, setLocalImages] = useState([]);

  const getMediaLocalUrl = (files) => {
    const imageUrls = [];
    for (let file of files) {
      //   console.log("file", file);
      if (file.size > 5 * 1000 * 1000) return;
      const imageUrl = URL.createObjectURL(file);
      imageUrls.push(imageUrl);
    }
    setLocalImages([...localImages, ...imageUrls]);

    setPostDetails((prev) => ({
      ...prev,
      media: [...prev?.media, ...files],
    }));
  };

  const handleCountryList = async () => {
    await handleApiRequest(getAllCountry);
  };

  const handleCityList = async () => {
    await handleApiRequest(getAllCity, postDetails.country?._id);
  };

  const handleProccedToNextStep = async () => {
    const formData = new FormData();
    postDetails.media.forEach((image) => {
      formData.append("images", image);
    });
    const response = await handleApiRequest(uploadFile, formData);

    if (response.status) {
      setPostDetails((prev) => {
        if (!postDetails.video) {
          return {
            ...prev,
            media: [...response.data],
          };
        } else {
          return {
            ...prev,
            media: [...response.data, { url: postDetails.video, type: "video/mp4" }],
          };
        }
      });

      setPostUploadStep(2);
    }
  };

  useEffect(() => {
    handleCountryList();
  }, []);

  useEffect(() => {
    if (allCountries.data && postDetails.country) handleCityList();
  }, [allCountries, postDetails.country]);

  const proceedToNextStep =
    postDetails.country && postDetails.city && postDetails.type && postDetails.media.length >= 5;

  //   console.log("postDetails.media", postDetails.media);
  //   console.log("proceedToNextStep", proceedToNextStep);

  return (
    <>
      <Col md={12}>
        <div className="w-50 mx-auto">
          <SelectBox
            className="my-3"
            placeholder="Category*"
            options={categories}
            value={postDetails.type}
            onChange={(selected) => setPostDetails((prev) => ({ ...prev, type: selected }))}
          />
          <SelectBox
            className="my-3"
            placeholder="Country*"
            options={allCountries.data?.items}
            value={postDetails.country}
            getOptionLabel={(option) => option.name}
            getOptionValue={(option) => option._id}
            onChange={(selected) =>
              setPostDetails((prev) => ({
                ...prev,
                country: selected,
                currency: { value: selected.currency, label: selected.currency },
              }))
            }
          />
          <SelectBox
            className="my-3"
            placeholder="City*"
            options={allCities.data?.items}
            value={postDetails.city}
            getOptionLabel={(option) => option.name}
            getOptionValue={(option) => option._id}
            onChange={(selected) => setPostDetails((prev) => ({ ...prev, city: selected }))}
          />
          <label>Images*</label>
          <p className="small text-muted">Add at least 5 and maximum 20 images ( Max 5MB )</p>
          <div className="postImageWrapper d-flex align-items-center">
            <label htmlFor="selectpostImage" className="imageploadBtn">
              +
            </label>
            <input
              id="selectpostImage"
              type="file"
              multiple
              className="d-none"
              onChange={(e) => {
                getMediaLocalUrl(e.target.files);
              }}
            />
            {localImages.map((image, i) => (
              <div key={image + i} className="position-relative">
                <img src={image} className="postImagePreview" />
                <p
                  className="imageRemoveIcon"
                  onClick={() => {
                    const oldImages = [...localImages];
                    oldImages.splice(i, 1);
                    setLocalImages(oldImages);

                    const oldMedia = [...postDetails.media];
                    oldMedia.splice(i, 1);
                    setPostDetails((prev) => ({
                      ...prev,
                      media: oldMedia,
                    }));
                  }}
                >
                  +
                </p>
              </div>
            ))}
          </div>

          <input
            type="text"
            className="form-control my-3"
            placeholder="Link for video"
            value={postDetails.video}
            onChange={(e) => setPostDetails((prev) => ({ ...prev, video: e.target.value }))}
          />
        </div>
        <Button
          variant="danger"
          className="my-3 w-50 mx-auto d-flex justify-content-center"
          disabled={!proceedToNextStep}
          onClick={() => handleProccedToNextStep()}
        >
          Next
        </Button>
      </Col>
    </>
  );
};

import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { Button, Col, Row } from "react-bootstrap";
import CKEditor from "react-ckeditor-component";
import { FaArrowLeftLong } from "react-icons/fa6";
import HeroAdd from "../../components/heroSection/heroAdd";
import SelectBox from "../../components/selectBox";
import Asterik from "../../components/common/asterik";
import { categories, preventMinus } from "../../utils";
import { handleApiRequest } from "../../services/handleApiRequest";
import { getAllCity, getAllCountry } from "../../redux/countryAndCity/thunk";
import { postFeatures } from "../../utils/filters";
import { getAllMake, getAllModel, getAllVariant } from "../../redux/makeAndModel/thunk";
import { addVehicle, getVehicleDetails, updateVehicle } from "../../redux/vehicles/thunk";
import { errorMsg, successMsg } from "../../utils/toastMsg";
import { uploadFile } from "../../redux/common/thunk";
import parseKey from "../../utils/parseKey";

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
  const { state } = useLocation();
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const { vehicleDetails } = useSelector((state) => state.vehicles);
  // const { allMakes, allModels, allVariants } = useSelector((state) => state.makeAndModel);

  const [postUploadStep, setPostUploadStep] = useState(state || 1);
  const [postDetails, setPostDetails] = useState({ media: [] });
  const [localImages, setLocalImages] = useState([...postDetails.media]);
  const [featuresList, setFeaturesList] = useState(postFeatures);

  const handleVehicleDetails = async () => {
    await handleApiRequest(getVehicleDetails, id);
  };

  useEffect(() => {
    if (id) {
      handleVehicleDetails();
    }
  }, [id]);

  useEffect(() => {
    if (id && vehicleDetails.data) {
      const myPostDetails = {};
      const myFeatureList = [
        ...featuresList,
        { value: "price" },
        { value: "mileage" },
        { value: "title" },
        { value: "type" },
      ];

      myFeatureList?.map((feature) => {
        if (
          typeof vehicleDetails.data[feature.value] === "string" ||
          typeof vehicleDetails.data[feature.value] === "number"
        ) {
          myPostDetails[feature.value] = {
            value: vehicleDetails.data[feature.value],
            label:
              typeof vehicleDetails.data[feature.value] === "number"
                ? vehicleDetails.data[feature.value]
                : parseKey(vehicleDetails.data[feature.value]),
          };
        }
      });
      setPostDetails({ ...vehicleDetails.data, ...myPostDetails });
    }
  }, [vehicleDetails]);

  useEffect(() => {
    if (postDetails.media) {
      setLocalImages(postDetails.media);
    }
  }, [postDetails.media]);

  // console.log("postDetails", postDetails);
  // console.log("featuresList", featuresList);
  // console.log("vehicleDetails", vehicleDetails);

  return (
    <>
      <section>
        <HeroAdd />

        <Row className="sellVehicleFeatureContainer mx-2 justify-content-center">
          <Row
            className="my-3 d-flex justify-content-center align-items-center"
            // style={{ maxWidth: 800 }}
          >
            {postUploadStep === 2 && (
              <h5 className="pointer  m-0" onClick={() => setPostUploadStep(1)}>
                <FaArrowLeftLong className="me-1" />
                Back
              </h5>
            )}
            <h4 className="m-0 my-2  text-center">Car details</h4>
          </Row>
          {postUploadStep === 1 ? (
            <PostStepOne
              postDetails={postDetails}
              setPostDetails={setPostDetails}
              setPostUploadStep={setPostUploadStep}
              localImages={localImages}
              setLocalImages={setLocalImages}
            />
          ) : (
            <PostStepTwo
              postDetails={postDetails}
              setPostDetails={setPostDetails}
              featuresList={featuresList}
              setFeaturesList={setFeaturesList}
            />
          )}
        </Row>
      </section>
    </>
  );
}

export const PostStepOne = ({
  postDetails,
  setPostDetails,
  setPostUploadStep,
  localImages,
  setLocalImages,
}) => {
  const { allCountries, allCities } = useSelector((state) => state.countryAndCity);

  const handleChange = (name, value) => {
    setPostDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const getMediaLocalUrl = (e) => {
    const files = e.target.files;
    const imageUrls = [];
    for (let file of files) {
      // console.log("file", file);
      if (file.size > 5 * 1000 * 1000) return;
      const imageUrl = URL.createObjectURL(file);
      imageUrls.push({ url: imageUrl, type: "image", file: file });
    }
    setLocalImages((prev) => [...prev, ...imageUrls]);
    e.target.value = "";
  };

  const handleRemovelocalImage = (i) => {
    const oldImages = [...localImages];
    oldImages.splice(i, 1);
    setLocalImages([...oldImages]);
  };

  const handleCountryList = async () => {
    await handleApiRequest(getAllCountry);
  };

  const handleCityList = async () => {
    await handleApiRequest(getAllCity, postDetails.country?._id);
  };

  const handleProccedToNextStep = async () => {
    const formData = new FormData();
    const allLocalImages = [];
    const allLiveImages = [];
    localImages.map((image) => {
      if (image.type === "image") {
        allLocalImages.push(image);
      } else {
        allLiveImages.push(image);
      }
    });

    allLocalImages.forEach((image) => {
      formData.append("images", image.file);
    });

    let myPosts = [...localImages];
    if (allLocalImages.length > 0) {
      const response = await handleApiRequest(uploadFile, formData);
      console.log("response.data", response.data);
      if (response.status) {
        myPosts = [...allLiveImages, ...response.data];
      }
    }

    setPostDetails((prev) => {
      if (!postDetails.video) {
        return {
          ...prev,
          media: [...myPosts],
        };
      } else {
        return {
          ...prev,
          media: [...myPosts, { url: postDetails.video, type: "video/mp4" }],
        };
      }
    });
    if (myPosts.length < 5) return errorMsg("Atleast 5 images required");
    setPostUploadStep(2);
  };

  const handleSelectMainImage = (i) => {
    const oldImages = [...localImages];
    const oldImage = oldImages[i];
    oldImages.splice(i, 1);
    oldImages.unshift(oldImage);
    setLocalImages([...oldImages]);
  };

  useEffect(() => {
    handleCountryList();
  }, []);

  useEffect(() => {
    if (allCountries.data && postDetails.country) handleCityList();
  }, [postDetails.country]);

  const proceedToNextStep =
    postDetails.country &&
    postDetails.city &&
    postDetails.type &&
    (localImages?.length >= 5 || localImages?.length <= 20);

  //   console.log("postDetails.media", postDetails.media);
  //   console.log("proceedToNextStep", proceedToNextStep);
  // console.log("postDetails", postDetails);
  // console.log("localImages", localImages);

  return (
    <>
      <Col md={6} className="sellFeatureBoxWrapper">
        <SelectBox
          className="my-3"
          placeholder="Category*"
          options={categories}
          value={postDetails.type}
          onChange={(selected) => handleChange("type", selected)}
        />
        <SelectBox
          className="sellFeatureBox my-3"
          placeholder="Country*"
          options={allCountries.data?.items}
          value={postDetails.country}
          getOptionLabel={(option) => option.name}
          getOptionValue={(option) => option._id}
          onChange={(selected) =>
            setPostDetails((prev) => ({
              ...prev,
              country: selected,
              currency: postDetails.currency?.value
                ? postDetails.currency
                : {
                    value: selected.currency,
                    label: selected.currency,
                  },
              city: "",
            }))
          }
        />
        <SelectBox
          className="sellFeatureBox my-3"
          placeholder="City*"
          options={allCities.data?.items}
          value={postDetails.city || ""}
          getOptionLabel={(option) => option.name}
          getOptionValue={(option) => option._id}
          onChange={(selected) => handleChange("city", selected)}
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
              getMediaLocalUrl(e);
            }}
          />
          {localImages.map((image, i) => (
            <div key={image.url} className="position-relative">
              <img
                src={image.url}
                className="postImagePreview pointer"
                onClick={() => handleSelectMainImage(i)}
              />
              <p
                className="imageRemoveIcon"
                onClick={() => {
                  handleRemovelocalImage(i);
                }}
              >
                +
              </p>
              {i === 0 && <p className="mainImageLabel">Main Image</p>}
            </div>
          ))}
        </div>
        {localImages.length > 0 && <p className="small">Click on the image to select main image</p>}

        <input
          type="text"
          className="form-control my-3"
          placeholder="Link for video"
          value={postDetails.video}
          onChange={(e) => handleChange("video", e.target.value)}
        />
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

export const PostStepTwo = ({ postDetails, setPostDetails, featuresList, setFeaturesList }) => {
  const navigate = useNavigate();
  const { allMakes, allModels } = useSelector((state) => state.makeAndModel);

  const handleChange = (name, value) => {
    if (name === "make")
      setPostDetails((prev) => ({ ...prev, [name]: value, model: "", variant: "" }));
    else if (name === "model") setPostDetails((prev) => ({ ...prev, [name]: value, variant: "" }));
    else setPostDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleCreatePost = async (status) => {
    const request = { ...postDetails, type: "cars", status: status || "pending" };

    const allKeys = featuresList.map((elem) => elem.value);
    allKeys.push("price", "mileage", "description", "currency", "title", "type");

    for (let key of allKeys) {
      if (!postDetails[key]) return errorMsg(`${key} is required`);
      if (key !== "media" && key !== "description") {
        request[key] = postDetails[key]?.value || postDetails[key]?._id;
      }
    }

    let response = {};
    if (request._id) {
      response = await handleApiRequest(updateVehicle, request);
    } else {
      response = await handleApiRequest(addVehicle, request);
    }

    if (response.status) {
      setPostDetails({ media: [] });
      if (status === "draft") {
        navigate("/my-items");
      } else {
        navigate("/successMsg");
      }
    }
  };

  const handleMakeList = async () => {
    handleApiRequest(getAllMake);
  };

  const handleModelList = async () => {
    handleApiRequest(getAllModel, postDetails.make?.value || postDetails.make?._id);
  };

  const handleVariantList = async () => {
    handleApiRequest(getAllVariant, postDetails.model?.value);
  };

  useEffect(() => {
    handleMakeList();
  }, []);

  useEffect(() => {
    if (allMakes.data && postDetails.make) handleModelList();
    // if (allModels.data && postDetails.model) handleVariantList();
  }, [postDetails.make, allMakes]);

  useEffect(() => {
    const oldFeatures = [...featuresList];
    const makeIndex = oldFeatures.findIndex((elem) => elem.label === "Make");
    const modelIndex = oldFeatures.findIndex((elem) => elem.label === "Model");
    // const variantIndex = oldFilters.findIndex((elem) => elem.label === "Variant");

    if (allMakes.data) {
      oldFeatures[makeIndex].options = allMakes.data?.items;
    }
    if (postDetails.make && allModels.data) {
      oldFeatures[modelIndex].options = allModels.data.items;
    }
    // if (postDetails.model && allVariants.data) {
    //   oldFilters[variantIndex].options = allVariants.data.items;
    // }

    setFeaturesList(oldFeatures);
  }, [allMakes, allModels]);

  // console.log("postDetails", postDetails);
  // console.log("allModels", allModels);

  return (
    <>
      <Row style={{ maxWidth: 800 }}>
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
              maxLength={50}
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
              <Col key={filter.value} md={6} className="my-2 ">
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
        <Col md={6} className="my-2">
          <label htmlFor="" className="form-label mb-0">
            Mileage (per mile)
            <Asterik />
          </label>
          <div className="input-group has-validation">
            <input
              type="number"
              className="form-control"
              style={{ height: 40 }}
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
        <Col md={6} className="my-2">
          <label htmlFor="" className="form-label mb-0">
            Price
            <Asterik />
          </label>
          <div className="input-group has-validation">
            <input
              type="number"
              className="form-control"
              style={{ height: 40 }}
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
          <label htmlFor="" className="form-label mb-0 mt-2">
            Description
          </label>
          <div className="input-group has-validation">
            <CKEditor
              activeClass="p10 w-100"
              content={postDetails.description}
              events={{
                change: (e) => {
                  // const textCount = e.editor
                  //   .getData()
                  //   .replace(/<[^>]*>/g, "")
                  //   .replace(/\n/g, "").length;
                  // console.log("length", e.editor.getData().replace(/<[^>]*>/g, ""), textCount);

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
          <Button variant="danger" onClick={() => handleCreatePost("pending")}>
            Post Advert
          </Button>
          <Button variant="danger" className="mx-2" onClick={() => handleCreatePost("draft")}>
            Save Draft
          </Button>
        </Col>
      </Row>
    </>
  );
};

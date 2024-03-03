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
import { getAllMake, getAllModel, getAllVariant } from "../../redux/makeAndModel/thunk";
import { addVehicle, getVehicleDetails, updateVehicle } from "../../redux/vehicles/thunk";
import { errorMsg } from "../../utils/toastMsg";
import { uploadFile } from "../../redux/common/thunk";
import parseKey, { parseCamelKey } from "../../utils/parseKey";
import { carsPostFeatures, handlePopularCarsMakeList } from "../../utils/filters/cars";
import { vansPostFeatures } from "../../utils/filters/vans";
import { bikesPostFeatures } from "../../utils/filters/bikes";
import { motorhomesPostFeatures } from "../../utils/filters/motorhomes";
import { caravansPostFeatures } from "../../utils/filters/caravans";

export default function SellVehicle() {
  const { state } = useLocation();
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const { vehicleDetails } = useSelector((state) => state.vehicles);
  // const { allMakes, allModels, allVariants } = useSelector((state) => state.makeAndModel);

  const [postUploadStep, setPostUploadStep] = useState(state || 1);
  const [postDetails, setPostDetails] = useState({ media: [] });
  const [localImages, setLocalImages] = useState([...postDetails.media]);
  const [featuresList, setFeaturesList] = useState();

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
            <h4 className="m-0 my-2  text-center">
              {postDetails.type?.label ? postDetails.type?.label?.slice(0, -1) : "Car"} details
            </h4>
          </Row>
          {postUploadStep === 1 ? (
            <PostStepOne
              postDetails={postDetails}
              setPostDetails={setPostDetails}
              setPostUploadStep={setPostUploadStep}
              localImages={localImages}
              setLocalImages={setLocalImages}
              setFeaturesList={setFeaturesList}
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
  setFeaturesList,
}) => {
  const { userProfile } = useSelector((state) => state.profile);
  const { allCountries, allCities } = useSelector((state) => state.countryAndCity);

  const supportedFileTypes = ["jpg", "jpeg", "png"];

  const handleChange = (name, value) => {
    setPostDetails((prev) => {
      if (name === "type") {
        return {
          ...prev,
          [name]: value,
          make: "",
          model: "",
        };
      } else {
        return {
          ...prev,
          [name]: value,
        };
      }
    });
  };

  const getMediaLocalUrl = (e) => {
    const files = e.target.files;
    const imageUrls = [];
    for (let file of files) {
      if (!supportedFileTypes.includes(file.type?.split("/")?.[1]))
        return errorMsg("Invalid file type");

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
    // if (myPosts.length < 5) return errorMsg("Atleast 5 images required");
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
    if (postDetails.country) handleCityList();
  }, [postDetails.country]);

  useEffect(() => {
    if (userProfile.data) {
      setPostDetails((prev) => ({
        ...prev,
        country: userProfile.data.country,
        currency: {
          value: userProfile.data.country.currency,
          label: userProfile.data.country.currency,
        },
      }));
    }
  }, [userProfile]);

  useEffect(() => {
    if (postDetails.type && postDetails.type?.value === "cars") {
      setFeaturesList(carsPostFeatures);
    } else if (postDetails.type && postDetails.type?.value === "caravans") {
      setFeaturesList(caravansPostFeatures);
    } else if (postDetails.type && postDetails.type?.value === "vans") {
      setFeaturesList(vansPostFeatures);
    } else if (postDetails.type && postDetails.type?.value === "bikes") {
      setFeaturesList(bikesPostFeatures);
    } else if (postDetails.type && postDetails.type?.value === "motorhomes") {
      setFeaturesList(motorhomesPostFeatures);
    } else {
      setFeaturesList([]);
    }
  }, [postDetails.type]);

  const proceedToNextStep =
    postDetails.country &&
    postDetails.city &&
    postDetails.type &&
    (localImages?.length >= 5 || localImages?.length <= 20);

  //   console.log("postDetails.media", postDetails.media);
  //   console.log("proceedToNextStep", proceedToNextStep);
  // console.log("postDetails", postDetails);
  // console.log("localImages", localImages);
  // console.log("userProfile", userProfile);

  return (
    <>
      <Col md={6} className="sellFeatureBoxWrapper">
        <SelectBox
          className="my-3"
          placeholder={
            <span>
              Category<span className="text-danger">*</span>
            </span>
          }
          options={categories.slice(0, 5)}
          value={postDetails.type}
          onChange={(selected) => handleChange("type", selected)}
        />
        <SelectBox
          isDisabled
          className="sellFeatureBox my-3"
          placeholder={
            <span>
              Country<span className="text-danger">*</span>
            </span>
          }
          options={allCountries.data?.items}
          value={userProfile.data?.country}
          // value={postDetails.country}
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
          placeholder={
            <span>
              City<span className="text-danger">*</span>
            </span>
          }
          options={
            allCities.data?.items ? [...allCities.data?.items, { _id: "other", name: "Other" }] : []
          }
          value={postDetails.city || ""}
          getOptionLabel={(option) => option.name}
          getOptionValue={(option) => option._id}
          onChange={(selected) => handleChange("city", selected)}
        />

        {postDetails.city?._id === "other" && (
          <input
            type="text"
            className="form-control my-3"
            placeholder="Enter city name"
            value={postDetails.city?._id === "other" ? postDetails.newCity : ""}
            onChange={(e) => handleChange("newCity", e.target.value)}
          />
        )}

        <label>
          Images<span className="text-danger">*</span>
        </label>
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
  const [errors, setErrors] = useState({});
  const [popularMakes, setPopularMakes] = useState([]);

  const handleChange = (name, value) => {
    if (name === "make")
      setPostDetails((prev) => ({ ...prev, [name]: value, model: "", variant: "" }));
    else if (name === "model") setPostDetails((prev) => ({ ...prev, [name]: value, variant: "" }));
    else setPostDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleCreatePost = async (status) => {
    const request = {
      ...postDetails,
      status: status || "pending",
      isFeatured: false,
    };

    const allKeys = featuresList.map((elem) => elem.value);
    allKeys.push("price", "mileage", "description", "currency", "title", "type");

    let myErrors = {};

    for (let key of allKeys) {
      if (!postDetails[key] && request.status !== "draft") {
        myErrors = { ...myErrors, [key]: `*${parseCamelKey(key)} is required` };
        // errorMsg(`${key} is required`);
      }
      if (key !== "media" && key !== "description") {
        request[key] = postDetails[key]?.value || postDetails[key]?._id;
      }
    }

    if (Object.values(myErrors || {}).filter((item) => item).length > 0) {
      setErrors(myErrors);
      return;
    }

    if (request.newCity && request.city === "other") {
      request.city = request.newCity;
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
    handleApiRequest(getAllMake, { type: postDetails.type?.value || postDetails.type });
  };

  const handleModelList = async () => {
    handleApiRequest(getAllModel, {
      makeId: postDetails.make?.value || postDetails.make?._id,
      type: postDetails.type?.value || postDetails.type,
    });
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

    if (allMakes.data && popularMakes) {
      oldFeatures[makeIndex].options = [
        { label: "most searched for", options: popularMakes },
        { label: "All makes", options: allMakes.data?.items },
      ];
    }
    if (postDetails.make && allModels.data) {
      oldFeatures[modelIndex].options = allModels.data.items;
    }
    // if (postDetails.model && allVariants.data) {
    //   oldFilters[variantIndex].options = allVariants.data.items;
    // }

    setFeaturesList(oldFeatures);
  }, [allMakes, allModels, popularMakes]);

  useEffect(async () => {
    const myMakes = await handlePopularCarsMakeList();
    setPopularMakes(myMakes);
  }, [allMakes]);

  console.log("featuresList", featuresList);

  return (
    <>
      <Row style={{ maxWidth: 800 }}>
        <Col xs={12}>
          <label htmlFor="" className="form-label mb-0">
            Title
            <Asterik />
          </label>
          <div className="input-group has-validation">
            <input
              type="text"
              className={`form-control ${errors.title ? "border-danger" : ""}`}
              placeholder="Enter title"
              name="title"
              maxLength={65}
              value={postDetails.title?.value || ""}
              onChange={(e) =>
                handleChange("title", { value: e.target.value, label: e.target.value })
              }
            />
          </div>
          {errors.title && <p className="m-0 text-danger">{errors.title}</p>}
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
                  styles={{
                    control: (baseStyle) => {
                      return { ...baseStyle, border: errors[filter.value] ? "1px solid red" : "" };
                    },
                  }}
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
                {errors[filter.value] && <p className="m-0 text-danger">{errors[filter.value]}</p>}
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
              className={`form-control ${errors.mileage ? "border-danger" : ""}`}
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
          {errors.mileage && <p className="m-0 text-danger">{errors.mileage}</p>}
        </Col>
        <Col md={6} className="my-2">
          <label htmlFor="" className="form-label mb-0">
            Price
            <Asterik />
          </label>
          <div className="input-group has-validation">
            <input
              type="number"
              className={`form-control ${errors.price ? "border-danger" : ""}`}
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
          {errors.price && <p className="m-0 text-danger">{errors.price}</p>}
        </Col>

        <Col xs={12}>
          <label htmlFor="" className="form-label mb-0 mt-2">
            Description
            <Asterik />
          </label>
          <div
            className="input-group has-validation"
            style={{ border: errors.description ? "1px solid red" : "" }}
          >
            <CKEditor
              activeClass={`p-10 w-100`}
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
          {errors.description && <p className="m-0 text-danger">{errors.description}</p>}
        </Col>
        <Col className="my-2">
          <Button variant="danger" onClick={() => handleCreatePost("pending")}>
            Post Advert
          </Button>
          <Button variant="danger" className="mx-2" onClick={() => handleCreatePost("draft")}>
            Save as Draft
          </Button>
        </Col>
      </Row>
    </>
  );
};

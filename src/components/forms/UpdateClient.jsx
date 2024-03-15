import {
  FormControl,
  FormLabel,
  Button,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Tag,
  TagLabel,
  TagCloseButton,
  Flex,
  Input,
  Box
} from "@chakra-ui/react";
import { Select } from "antd";
import axios from "axios";
import { useState, useEffect, useRef } from "react";
import { CountryDropdown, RegionDropdown } from "react-country-region-selector";
import { toast } from "react-toastify";
import SelectSource from "../common/SelectSource";
import MyDatePicker from "../common/MyDatePicker";
import SelectTag from "../common/SelectTag";
import { useSelector, useDispatch } from "react-redux";
import { selectClientId, clearClientId } from "../../store/slice/ClientSlice";
import moment from "moment";

const UpdateClient = () => {
  const singleFileRef = useRef();
  const clientId = useSelector(selectClientId);
  const dispatch = useDispatch();
  const [client, setClient] = useState("");
  const [projectData, setProjectData] = useState({
    enquiryDate: new Date(),
    title: "",
    gender: "",
    clientBirthday: "",
    clientAnniversary: "",
    companyAnniversary: "",
    workStartDate: "",
    source: [],
    companyName: "",
    clientName: "",
    brandName: "",
    phone1: "",
    phone2: "",
    email1: "",
    email2: "",
    website: "",
    businessAddress: "",
    city: "",
    state: "",
    pincode: "",
    country: "",
    requirement: "",
    additionalInformation: "",
    singleFile: null,
    multipleFiles: [],
    singleFileView: null,
    multipleFilesView: [],
    singleFileToRemove: null,
    multipleFilesToRemove: []
  });
  useEffect(() => {
    axios
      .get(
        `${import.meta.env.VITE_API_BASE
        }/api/admin/getClientDetails/${clientId}`
      )
      .then((response) => {
        const clientData = response.data;
        setClient(response.data);
        setProjectData((prev) => ({
          ...prev,
          // Populate projectData with fetched client details
          enquiryDate: clientData?.enquiryDate
            ? new Date(clientData.enquiryDate)
            : prev.enquiryDate,
          title: clientData?.title || prev.title,
          gender: clientData?.gender || prev.gender,
          clientBirthday: clientData?.clientBirthday || prev.clientBirthday,
          clientAnniversary:
            clientData?.clientAnniversary || prev.clientAnniversary,
          companyAnniversary:
            clientData?.companyAnniversary || prev.companyAnniversary,
          workStartDate: clientData?.workStartDate || prev.workStartDate,
          source: clientData?.source || prev.source,
          companyName: clientData?.companyName || prev.companyName,
          clientName: clientData?.clientName || prev.clientName,
          brandName: clientData?.brandName || prev.brandName,
          phone1: clientData?.phone1 || prev.phone1,
          phone2: clientData?.phone2 || prev.phone2,
          email1: clientData?.email1 || prev.email1,
          email2: clientData?.email2 || prev.email2,
          website: clientData?.website || prev.website,
          businessAddress: clientData?.businessAddress || prev.businessAddress,
          city: clientData?.city || prev.city,
          state: clientData?.state || prev.state,
          pincode: clientData?.pincode || prev.pincode,
          country: clientData?.country || prev.country,
          requirement: clientData?.requirement || prev.requirement,
          additionalInformation:
            clientData?.additionalInformation || prev.additionalInformation,
          singleFileView: clientData?.singleFile || prev.singleFileView,
          multipleFilesView: clientData?.multipleFiles || prev.multipleFilesView,
          singleFile: null,
          multipleFiles: [],
        }));

        setSelectedCountry(clientData.country);
        setSelectedState(clientData.state);
        setSelectSourceValue(clientData.source);
        setSelectedTagValue(clientData.requirement);

      })

      .catch((error) => {
        console.error("Error fetching client details:", error);
        toast.error("Failed to fetch client details");
      });
  }, [clientId]);
  const workStartDate= projectData.workStartDate ? moment(projectData.workStartDate, 'DD-MM-YY') : null;
  const clientBirthdayDate= projectData.clientBirthday? moment(projectData.clientBirthday, 'DD-MM-YY') : null;
  const clientAnniversaryDate = projectData.clientAnniversary? moment(projectData.clientAnniversary, 'DD-MM-YY') : null;
  const companyAnniversaryDate = projectData.companyAnniversary? moment(projectData.companyAnniversary, 'DD-MM-YY') : null;


  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [tags, setTags] = useState([]);
  const [selectSourceValue, setSelectSourceValue] = useState([]);
  const [selectedTagValue, setSelectedTagValue] = useState([]);

  const handleSelectOption = (name, value) => {
    setProjectData({ ...projectData, [name]: value });
  };
  useEffect(() => {
    setProjectData((prev) => ({
      ...prev,
      source: selectSourceValue,
      requirement: selectedTagValue,
    }));
  }, [selectSourceValue, selectedTagValue]);


  const removeTagById = (tagToRemove) => {
    setProjectData({
      ...projectData,
      source: projectData.source.filter((tag) => tag !== tagToRemove),
    });
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProjectData({ ...projectData, [name]: value });
  };
  const getTagNameById = (id) => {
    const tag = tags.find((tag) => tag.source_tag_id === id);
    return tag ? tag.sourceTagName : "Unknown Tag";
  };

  const handleTagChange = (e) => {
    const selectedTags = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );

    // Fetch tag names for selected tag IDs
    const selectedTagNames = selectedTags.map((tagId) => getTagNameById(tagId));
    console.log(selectedTagNames);

    // Update projectData with tag names
    setProjectData({
      ...projectData,
      source: [...projectData.source, ...selectedTagNames],
    });
  };
  const handleSelectChange = (setSelected, name) => (value) => {
    setSelected(value);
    setProjectData({ ...projectData, [name]: value });
  };

  const handleSingleFileChange = (e) => {
    setProjectData({ ...projectData, singleFile: e.target.files[0] });
  };

  const handleMultipleFilesChange = (e) => {
    const files = Array.from(e.target.files);
    console.log(files);
    setProjectData({
      ...projectData,
      multipleFiles: [...projectData.multipleFiles, ...files],
    });
  };

  const handleDeleteSingleFile = () => {
    singleFileRef.current.value = "";
    const { singleFile, ...newData } = projectData;
    setProjectData({ ...newData });
  };

  const handleAddSingleFileToRemove = (filename) => {
    projectData.singleFileToRemove = filename;
    setProjectData({ ...projectData });
  }
  const handleAddMultipleFilesToRemove = (filename) => {
    projectData.multipleFilesToRemove = [...projectData.multipleFilesToRemove, filename];
    console.log(projectData.multipleFilesToRemove)
    setProjectData({ ...projectData });
  }
  const handleDeleteMultipleFile = (index) => {
    const updatedFiles = [...projectData.multipleFiles];
    updatedFiles.splice(index, 1);
    setProjectData({ ...projectData, multipleFiles: updatedFiles });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    delete projectData.singleFileView;
    delete projectData.multipleFilesView;
    const formData = new FormData();
    Object.entries(projectData).forEach(([key, value]) => {
      if (key === "source" && Array.isArray(value)) {
        value.forEach((sourceItem, index) => {
          formData.append(`${key}[${index}]`, sourceItem);
        });
      } else if (key === "multipleFiles" && Array.isArray(value)) {
        for (let i = 0; i < value.length; i++) {
          formData.append('multipleFiles', value[i]);
        }
      } else if (key === "multipleFilesToRemove" && Array.isArray(value)) {
        for (let i = 0; i < value.length; i++) {
          formData.append('multipleFilesToRemove', value[i]);
        }
      }

      else if (key === "requirement" && Array.isArray(value)) {
        value.forEach((sourceItem, index) => {
          formData.append(`${key}[${index}]`, sourceItem);
        });
      } else if (value !== "" && value !== undefined) {
        formData.append(key, value);
      }
    });
    axios
      .patch(
        `${import.meta.env.VITE_API_BASE}/api/admin/updateClient/${clientId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((response) => {
        if (response.status === 200) {
          toast.success(response.data.message);
        } else {
          console.error("Failed to create project");
          toast.success(response.data.message);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        toast.error(error.response.data.message);
      });
  };

  return (
    <>
      {" "}
      <Box
        mx="auto"
        borderWidth="1px"
        borderRadius="lg"
        p="4"
        boxShadow="lg"
        m="4"
      >
        <h1 className="text-2xl font-semibold">
          Update Client {client.clientName}
        </h1>

        <form onSubmit={handleSubmit}>
          {/* <FormControl id="enquiryDate" isRequired>
                <FormLabel>Enquiry Date</FormLabel>
                <MyDatePicker
                    selected={projectData.enquiryDate}
                    onChange={(date) =>
                        setProjectData({ ...projectData, enquiryDate: date })
                    }
                    defaultValue={moment()}
                    format={"DD/MM/YYYY"}
                />
            </FormControl>
                */}
          <div className="hidden md:block">
            <Tabs>
              <TabList>
                <Tab>Client Information</Tab>
                <Tab>Address Information</Tab>
                <Tab>Personal Information</Tab>
                <Tab>Additional Information</Tab>
                <Tab>Files Information</Tab>
              </TabList>

              <TabPanels>
                <TabPanel>
                  <div className="flex gap-3 mb-2">
                    <FormControl id="title" maxWidth={130} isRequired>
                      <FormLabel>Title</FormLabel>
                      <Select
                        placeholder="Select Title"
                        onChange={(value) => handleSelectOption("title", value)}
                        value={projectData.title}
                      >
                        <Select.Option value="Mr.">Mr.</Select.Option>
                        <Select.Option value="Mrs.">Mrs.</Select.Option>
                      </Select>
                    </FormControl>

                    <FormControl id="clientName">
                      <FormLabel>Client Name</FormLabel>
                      <Input
                        name="clientName"
                        onChange={handleChange}
                        value={projectData.clientName}
                      />
                    </FormControl>
                    <FormControl id="gender" maxWidth={150}>
                      <FormLabel>Gender</FormLabel>
                      <Select
                        name="gender"
                        onChange={(value) =>
                          handleSelectOption("gender", value)
                        }
                        placeholder="Select gender"
                        value={client.gender}
                      >
                        <Select.Option value="Male">Male</Select.Option>
                        <Select.Option value="Female">Female</Select.Option>
                        <Select.Option value="Others">Others</Select.Option>
                      </Select>
                    </FormControl>
                    <FormControl id="brandName">
                      <FormLabel>Brand Name</FormLabel>
                      <Input
                        name="brandName"
                        onChange={handleChange}
                        value={client.brandName}
                      />
                    </FormControl>
                  </div>

                  <div className="flex gap-3 my-3">
                    <FormControl id="tags">
                      <FormControl id="companyName">
                        <FormLabel>Company Name</FormLabel>
                        <Input
                          name="companyName"
                          onChange={handleChange}
                          value={projectData.companyName}
                        />
                      </FormControl>
                      <FormLabel>Source</FormLabel>
                      <Flex>
                        <SelectSource
                          selectSourceValue={selectSourceValue}
                          setSelectSourceValue={setSelectSourceValue}
                        />
                      </Flex>
                    </FormControl>
                    <FormControl id="phone1">
                      <FormLabel>Phone Number 1</FormLabel>
                      <Input
                        name="phone1"
                        onChange={handleChange}
                        value={projectData.phone1}
                      />
                    </FormControl>
                    <FormControl id="phone2">
                      <FormLabel>Phone Number 2</FormLabel>
                      <Input
                        name="phone2"
                        onChange={handleChange}
                        value={projectData.phone2}
                      />
                    </FormControl>
                  </div>

                  <div className="flex gap-3 mb-3">
                    <FormControl id="email1">
                      <FormLabel>Email 1</FormLabel>
                      <Input
                        name="email1"
                        onChange={handleChange}
                        value={client.email1}
                      />
                    </FormControl>
                    <FormControl id="email2">
                      <FormLabel>Email 2</FormLabel>
                      <Input
                        name="email2"
                        onChange={handleChange}
                        value={client.email2}
                      />
                    </FormControl>
                    <FormControl id="website">
                      <FormLabel>Website</FormLabel>
                      <Input
                        name="website"
                        onChange={handleChange}
                        value={client.website}
                      />
                    </FormControl>
                  </div>
                  <div className="flex gap-3">
                    <FormControl id="companyAnniversary">
                      <FormLabel>Work Start Date</FormLabel>
                      <MyDatePicker
                        value={workStartDate}
                      selected={projectData.workStartDate}
                      onChange={(date) =>
                        setProjectData({
                          ...projectData,
                          workStartDate: date,
                        })
                      }
                      format={"DD/MM/YYYY"}
                      />
                    </FormControl>
                  </div>
                </TabPanel>
                <TabPanel>
                  <div className="flex gap-3 mb-3 flex-col md:flex-row">
                    <FormControl id="country">
                      <FormLabel>Country</FormLabel>
                      <CountryDropdown
                        name="country"
                        value={projectData.selectedCountry}
                        onChange={handleSelectChange(
                          setSelectedCountry,
                          "selectedCountry"
                        )}
                        className="border-[0.375px] rounded-md max-w-[200px] h-[2rem]"
                      />
                    </FormControl>
                    <FormControl id="state">
                      <FormLabel>State</FormLabel>
                      <RegionDropdown
                        country={selectedCountry}
                        name="state"
                        value={projectData.selectedState}
                        onChange={(e) =>
                          handleSelectChange(setSelectedState, "state", e)
                        }
                        className="border-[0.375px] rounded-md h-[2rem] max-w-24"
                      />
                    </FormControl>
                    <FormControl id="city">
                      <FormLabel>City</FormLabel>
                      <Input
                        name="city"
                        onChange={handleChange}
                        value={projectData.city}
                      />
                    </FormControl>
                    <FormControl id="pincode">
                      <FormLabel>Pincode</FormLabel>
                      <Input
                        name="pincode"
                        onChange={handleChange}
                        value={projectData.pincode}
                      />
                    </FormControl>
                  </div>
                  <FormControl id="businessAddress" className="w-1/2">
                    <FormLabel>Business Address</FormLabel>
                    <Input
                      name="businessAddress"
                      onChange={handleChange}
                      h="5rem"
                      value={projectData.businessAddress}
                    />
                  </FormControl>
                </TabPanel>

                <TabPanel>
                  <div className="flex gap-3">
                    <FormControl id="clientBirthday">
                      <FormLabel>Client Birthday</FormLabel>
                      <MyDatePicker
                      value={clientBirthdayDate}
                        selected={projectData.clientBirthday}
                        onChange={(date) =>
                          setProjectData({
                            ...projectData,
                            clientBirthday: date,
                          })
                        }
                        format={"DD/MM/YYYY"}
                      />
                    </FormControl>
                    <FormControl id="clientAnniversary">
                      <FormLabel>Client Anniversary</FormLabel>
                      <MyDatePicker
                      value={clientAnniversaryDate}
                        selected={projectData.clientAnniversary}
                        onChange={(date) =>
                          setProjectData({
                            ...projectData,
                            clientAnniversary: date,
                          })
                        }
                        format={"DD/MM/YYYY"}
                      />
                    </FormControl>
                    <FormControl id="companyAnniversary">
                      <FormLabel>Company Anniversary</FormLabel>
                      <MyDatePicker
                      value={clientAnniversaryDate}
                        selected={projectData.companyAnniversary}
                        onChange={(date) =>
                          setProjectData({
                            ...projectData,
                            companyAnniversary: date,
                          })
                        }
                        format={"DD/MM/YYYY"}
                      />
                    </FormControl>
                  </div>
                </TabPanel>
                <TabPanel>
                  <div className="flex flex-col gap-3">
                    <FormControl id="requirement" className="w-1/2">
                      <FormLabel>Requirement</FormLabel>
                      {/* <Input
                                        name="requirement"
                                        onChange={handleChange}
                                        className="h-16"
                                    /> */}
                      <SelectTag
                        selectTagValue={selectedTagValue}
                        setSelectTagValue={setSelectedTagValue}
                      />
                    </FormControl>
                    <FormControl id="additionalInformation" className="w-1/2">
                      <FormLabel>Additional Information</FormLabel>
                      <Input
                        name="additionalInformation"
                        onChange={handleChange}
                        className="h-16"
                        value={projectData.additionalInformation}
                      />
                    </FormControl>
                  </div>
                </TabPanel>
                <TabPanel>
                  <div>
                    <div>
                      <h2>Existing Files</h2>
                      <div className="flex gap-3">
                        {/* Display single file */}
                        {projectData.singleFileView && (
                          <div>
                            <div className="flex gap-1">
                              <p>
                                File : {projectData.singleFileView}
                              </p>
                              <Button as="a"
                                href={`${import.meta.env.VITE_API_BASE}/uploads/${projectData.singleFileView}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                textDecoration="none"
                                _hover={{ textDecoration: "none" }}
                                display="inline-block"
                                variant="solid">View</Button>
                              <Button onClick={() => {
                                handleAddSingleFileToRemove(projectData.singleFileView);
                              }}>Delete</Button>
                            </div>
                          </div>
                        )}
                      </div>
                      <div className="flex gap-3">
                        {/* Display multiple files */}
                        {projectData.multipleFilesView.map((file, index) => (
                          <div key={index}>
                            <p>
                              File {index + 1}: {file}
                            </p>
                            <div className="flex gap-1">
                              <Button as="a"
                                href={`${import.meta.env.VITE_API_BASE}/uploads/${file}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                textDecoration="none"
                                _hover={{ textDecoration: "none" }}
                                display="inline-block"
                                mr={2}
                                mb={2}
                                variant="solid">View</Button>
                              <Button onClick={() => {
                                handleAddMultipleFilesToRemove(file);
                              }}>Delete</Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h2>New Files</h2>
                      <div className="flex gap-3">
                        <FormControl mb="4">
                          <FormLabel>Single File</FormLabel>
                          <Input
                            type="file"
                            ref={singleFileRef}
                            onChange={handleSingleFileChange}
                          />
                        </FormControl>
                      </div>
                      <div className="flex gap-3">
                        <FormControl mb="4">
                          <FormLabel>Multiple Files</FormLabel>
                          <Input
                            type="file"
                            multiple
                            onChange={handleMultipleFilesChange}
                          />
                        </FormControl>
                      </div>
                    </div>
                    <Button type="submit" colorScheme="purple" className="mt-5">
                      Create Client
                    </Button>
                  </div>
                </TabPanel>
              </TabPanels>
            </Tabs>
          </div>

          <div className="block md:hidden">
            <Tabs>
              <TabList>
                <Tab>Personal Information</Tab>
                <Tab>Other Information</Tab>
              </TabList>

              <TabPanels>
                <TabPanel>
                  <div className="flex flex-col gap-3 mb-3">
                    <FormControl id="clientName">
                      <FormLabel>Client Name</FormLabel>
                      <Input name="clientName" onChange={handleChange} />
                    </FormControl>
                    <FormControl id="phone1">
                      <FormLabel>Phone Number 1</FormLabel>
                      <Input name="phone1" onChange={handleChange} />
                    </FormControl>
                    <FormControl id="phone2">
                      <FormLabel>Phone Number 2</FormLabel>
                      <Input name="phone2" onChange={handleChange} />
                    </FormControl>
                  </div>
                  <div className="flex gap-3 mb-3">
                    <FormControl id="tags">
                      <FormLabel>Source</FormLabel>
                      <SelectSource
                        width={150}
                        selectSourceValue={selectSourceValue}
                        setSelectSourceValue={setSelectSourceValue}
                      />

                      {projectData.source.map((tag) => (
                        <Tag
                          key={tag._id}
                          size="md"
                          borderRadius="full"
                          variant="solid"
                          colorScheme="blue"
                        >
                          <TagLabel>{tag}</TagLabel>
                          <TagCloseButton onClick={() => removeTagById(tag)} />
                        </Tag>
                      ))}
                    </FormControl>
                    <FormControl id="gender">
                      <FormLabel>Gender</FormLabel>
                      <Select
                        name="gender"
                        onChange={handleChange}
                        placeholder="Select gender"
                      >
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Others">Others</option>
                      </Select>
                    </FormControl>
                  </div>

                  <div className="flex flex-col gap-3">
                    <FormControl id="email1">
                      <FormLabel>Email 1</FormLabel>
                      <Input name="email1" onChange={handleChange} />
                    </FormControl>
                    <FormControl id="email2">
                      <FormLabel>Email 2</FormLabel>
                      <Input name="email2" onChange={handleChange} />
                    </FormControl>
                    <FormControl id="website">
                      <FormLabel>Website</FormLabel>
                      <Input name="website" onChange={handleChange} />
                    </FormControl>
                  </div>
                </TabPanel>
                <TabPanel>
                  <div className="flex gap-3 mb-3 flex-col md:flex-row">
                    <FormControl id="country">
                      <FormLabel>Country</FormLabel>
                      <CountryDropdown
                        name="country"
                        value={selectedCountry}
                        onChange={(e) =>
                          handleSelectChange(setSelectedCountry, "country", e)
                        }
                        className="border-[0.375px] rounded-md max-w-[200px] h-[2rem]"
                      />
                    </FormControl>
                    <FormControl id="state">
                      <FormLabel>State</FormLabel>
                      <RegionDropdown
                        country={selectedCountry}
                        name="state"
                        value={selectedState}
                        onChange={(e) =>
                          handleSelectChange(setSelectedState, "state", e)
                        }
                        className="border-[0.375px] rounded-md h-[2rem] max-w-24"
                      />
                    </FormControl>
                    <FormControl id="city">
                      <FormLabel>City</FormLabel>
                      <Input name="city" onChange={handleChange} />
                    </FormControl>
                    <FormControl id="pincode">
                      <FormLabel>Pincode</FormLabel>
                      <Input name="pincode" onChange={handleChange} />
                    </FormControl>
                  </div>
                  <FormControl id="businessAddress" className="w-1/2">
                    <FormLabel>Business Address</FormLabel>
                    <Input
                      name="businessAddress"
                      onChange={handleChange}
                      className="h-32"
                    />
                  </FormControl>
                  <div className="flex flex-col mt-3 gap-3">
                    <FormControl id="brandName" mb={3}>
                      <FormLabel>Brand Name</FormLabel>
                      <Input name="brandName" onChange={handleChange} />
                    </FormControl>
                    <FormControl id="companyName" mb={3}>
                      <FormLabel>Company Name</FormLabel>
                      <Input name="companyName" onChange={handleChange} />
                    </FormControl>
                    <FormControl id="gst" mb={3}>
                      <FormLabel>GST</FormLabel>
                      <Input name="gst" onChange={handleChange} />
                    </FormControl>
                  </div>
                  <FormControl id="billingAddress" className="w-1/2">
                    <FormLabel>Billing Address</FormLabel>
                    <Input
                      name="billingAddress"
                      onChange={handleChange}
                      className="h-32"
                    />
                  </FormControl>
                  <div className="flex flex-col mt-3 gap-3">
                    <FormControl id="requirement" className="w-1/2">
                      <FormLabel>Requirement</FormLabel>
                      <Input
                        name="requirement"
                        onChange={handleChange}
                        className="h-16"
                      />
                    </FormControl>
                    <FormControl id="additionalInformation" className="w-1/2">
                      <FormLabel>Additional Information</FormLabel>
                      <Input
                        name="additionalInformation"
                        onChange={handleChange}
                        className="h-16"
                      />
                    </FormControl>
                  </div>
                  <div className="flex mt-3 gap-3">
                    {/* Display single file */}
                    {projectData.singleFile && (
                      <div>
                        <p>Single File: {projectData.singleFile.name}</p>
                        <Button onClick={handleDeleteSingleFile}>Delete</Button>
                      </div>
                    )}
                    <FormControl mb="4">
                      <FormLabel>Single File</FormLabel>
                      <Input type="file" onChange={handleSingleFileChange} />
                    </FormControl>
                  </div>
                  <div className="flex gap-3">
                    {/* Display multiple files */}
                    {projectData.multipleFiles.map((file, index) => (
                      <div key={index}>
                        <p>
                          File {index + 1}: {file.name}
                        </p>
                        <Button onClick={() => handleDeleteMultipleFile(index)}>
                          Delete
                        </Button>
                      </div>
                    ))}
                    <FormControl mb="4">
                      <FormLabel>Multiple Files</FormLabel>
                      <Input
                        type="file"
                        multiple
                        onChange={handleMultipleFilesChange}
                      />
                    </FormControl>
                  </div>
                  <Button type="submit" colorScheme="purple" className="mt-5">
                    Create Client
                  </Button>
                </TabPanel>
              </TabPanels>
            </Tabs>
          </div>
        </form>
      </Box>
    </>
  );
};

export default UpdateClient;

import {
  FormControl,
  FormLabel,
  Button,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
} from "@chakra-ui/react";
import { Input, Select } from "antd";
import axios from "axios";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import MyDatePicker from "../common/MyDatePicker";

const Emp = () => {
  const [projectData, setProjectData] = useState({
    type:"",
    name: "",
    gender: "",
    contactNo: "",
    title: "",
    dob: "",
    position: "",
    designation: "",
    department: "",
    email: "",
    password: "",
    joiningDate: "",
    manager_id: "",
    probationPeriod: "",
    leavingDate: "",
    aadharNumber: "",
    panNumber: "",
    permanentAddress: "",
    correspondenceAddress: "",
    guardianDetails: {
      guardianName: "",
      guardianContactNo: "",
    },
    bankDetails: {
      bankName: "",
      bankAccountNo: "",
      bankIfscCode: "",
      type: "",
    },
  });

  const [tags, setTags] = useState([]);
  const [managers, setManagers] = useState([]);

  const joiningDate = `${projectData?.joiningDate?._d}`.slice(4, 15);

  // const removeTagById = (tagToRemove) => {
  //   setProjectData({
  //     ...projectData,
  //     source: projectData.source.filter((tag) => tag !== tagToRemove),
  //   });
  // };
  const handleChange = (e) => {
    
    const { name, value } = e.target;
    
    setProjectData({ ...projectData, [name]: value });
  };
  const handleSelectOption = (name, value) => {
    setProjectData({ ...projectData, [name]: value });
  };
  const getTagNameById = (id) => {
    const tag = tags.find((tag) => tag.source_tag_id === id);
    return tag ? tag.sourceTagName : "Unknown Tag";
  };
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_BASE}/api/admin/getManagersAllDetails`)
      .then((response) => {
        setManagers(response.data);
      })
      .catch((error) => {
        console.error("Error fetching clients:", error);
      });
  }, []);

  // const handleTagChange = (e) => {
  //   const selectedTags = Array.from(
  //     e.target.selectedOptions,
  //     (option) => option.value
  //   );

  //   // Fetch tag names for selected tag IDs
  //   const selectedTagNames = selectedTags.map((tagId) => getTagNameById(tagId));
  //   console.log(selectedTagNames);

  //   // Update projectData with tag names
  //   setProjectData({
  //     ...projectData,
  //     source: [...projectData.source, ...selectedTagNames],
  //   });
  // };
  // const handleSelectChange = (setSelected, name, value) => {
  //   setSelected(value);
  //   setProjectData({ ...projectData, [name]: value });
  // };
  // const handleSingleFileChange = (e) => {
  //   setProjectData({ ...projectData, singleFile: e.target.files[0] });
  // };

  // const handleMultipleFilesChange = (e) => {
  //   const files = Array.from(e.target.files);
  //   setProjectData({
  //     ...projectData,
  //     multipleFiles: [...projectData.multipleFiles, ...files],
  //   });
  // };

  // const handleDeleteSingleFile = () => {
  //   setProjectData({ ...projectData, singleFile: null });
  // };

  // const handleDeleteMultipleFile = (index) => {
  //   const updatedFiles = [...projectData.multipleFiles];
  //   updatedFiles.splice(index, 1);
  //   setProjectData({ ...projectData, multipleFiles: updatedFiles });
  // };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();

    // Filter out entries with empty string values
    Object.entries(projectData).forEach(([key, value]) => {
      if (value !== "") {
        formData.append(key, value);
      }
    });

    axios
      .post(
        `${import.meta.env.VITE_API_BASE}/api/admin/createEmployee`,
        formData,
        {
          headers: {
            "Content-Type": "application/json", 
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
  const handleSelectManager = (e) => {
    const selectedManagerId = e.target.value;
    setProjectData({ ...projectData, manager_id: selectedManagerId });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="hidden md:block">
        <Tabs>
          <TabList>
            <Tab>Employee Information</Tab>
            <Tab>Address Information</Tab>
            <Tab>Guardian Information</Tab>
            <Tab>Bank Information</Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              <div className="flex gap-3 mb-3">
                <FormControl id="title" maxWidth={100}>
                  <FormLabel>Title</FormLabel>
                  <Select
                    style={{ width: "100%" }}
                    placeholder="Select Title"
                    onChange={(value) => handleSelectOption("title", value)}
                  >
                    <Select.Option value="Mr.">Mr.</Select.Option>
                    <Select.Option value="Mrs.">Mrs.</Select.Option>
                  </Select>
                </FormControl>

                <FormControl id="employeeName">
                  <FormLabel>Employee Name</FormLabel>
                  <Input name="name" onChange={handleChange} />
                </FormControl>

                <FormControl id="gender" maxWidth={100}>
                  <FormLabel>Gender</FormLabel>
                  <Select
                    style={{ width: "100%" }}
                    name="gender"
                    onChange={(value) => handleSelectOption("gender", value)}
                    placeholder="Select gender"
                  >
                    <Select.Option value="Male">Male</Select.Option>
                    <Select.Option value="Female">Female</Select.Option>
                    <Select.Option value="Others">Others</Select.Option>
                  </Select>
                </FormControl>

                <FormControl id="contactNo">
                  <FormLabel>Contact Number</FormLabel>
                  <Input name="contactNo" onChange={handleChange} />
                </FormControl>
                <FormControl id="dob" maxWidth={150}>
                  <FormLabel>DOB</FormLabel>
                  <MyDatePicker
                    className="mb-1"
                    selected={projectData.dob}
                    onChange={(date) =>
                      setProjectData({ ...projectData, dob: date })
                    }
                    format={"DD/MM/YYYY"}
                  />
                  <br />
                  {projectData?.dob?._d && <>{`${projectData?.dob?._d}`.slice(4, 16)}</>}
                </FormControl>
              </div>

              <div className="flex gap-2 mb-2">
                <FormControl id="position" maxWidth={150}>
                  <FormLabel>Position</FormLabel>
                  <Select
                    style={{ width: "100%" }}
                    name="position"
                    onChange={(value) => handleSelectOption("position", value)}
                    placeholder="Select Position"
                  >
                    <Select.Option value="0">Superadmin</Select.Option>
                    <Select.Option value="1">Admin</Select.Option>
                    <Select.Option value="2">User</Select.Option>
                    <Select.Option value="3">Manager</Select.Option>
                  </Select>
                </FormControl>
                <FormControl id="designation">
                  <FormLabel>Designation</FormLabel>
                  <Input
                    name="designation"
                    onChange={handleChange}
                  />
                </FormControl>
              </div>

              <div className="flex gap-3 mb-3">
                <FormControl id="department" maxWidth={500}>
                  <FormLabel>Department</FormLabel>
                  <Input name="department" onChange={handleChange} />
                </FormControl>
                <FormControl id="email" maxWidth={350}>
                  <FormLabel>Email</FormLabel>
                  <Input name="email" onChange={handleChange} />
                </FormControl>
                <FormControl id="password" maxWidth={350}>
                  <FormLabel>Password</FormLabel>
                  <Input name="password" onChange={handleChange} />
                </FormControl>
              </div>

              <div className="flex gap-3 mb-3">
                <FormControl id="joiningDate" maxWidth={300}>
                  <FormLabel>Joining Date</FormLabel>
                  <MyDatePicker
                    className="mb-1"
                    selected={projectData.joiningDate}
                    onChange={(date) =>
                      setProjectData({ ...projectData, joiningDate: date })
                    }
                    format={"DD/MM/YYYY"}
                  />
                  <br />
                  {projectData?.joiningDate?._d && <>{joiningDate}</>}
                </FormControl>
                <FormControl id="manager_id">
                  <FormLabel>Assigned Manager</FormLabel>
                  <select
                    onChange={handleSelectManager}
                    value={projectData.manager_id}
                  >
                    <option value="">Select Manager</option>
                    {managers.map((manager, index) => (
                      <option key={`manager-${index}`} value={manager.id}>
                        {manager.name}
                      </option>
                    ))}
                  </select>
                </FormControl>

                <FormControl id="type" maxWidth={150}>
                  <FormLabel>Employment Type</FormLabel>
                  <Select
                    style={{ width: "100%" }}
                    name="type"
                    onChange={(value) => handleSelectOption("type", value)}
                    placeholder="Select Type"
                  >
                    <Select.Option value="Full-Time">Full-Time</Select.Option>
                    <Select.Option value="Part-Time">Part-Time</Select.Option>
                  </Select>
                </FormControl>
              </div>
              <div className="flex gap-3 mb-3">
                <FormControl id="aadharNumber">
                  <FormLabel>Aadhar Number</FormLabel>
                  <Input name="aadharNumber" onChange={handleChange} />
                </FormControl>
                <FormControl id="panNumber">
                  <FormLabel>Pan Number</FormLabel>
                  <Input name="panNumber" onChange={handleChange} />
                </FormControl>
                <FormControl id="probationPeriod">
                  <FormLabel>Probation Period</FormLabel>
                  <Input name="probationPeriod" onChange={handleChange} />
                </FormControl>
              </div>
            </TabPanel>
            <TabPanel>
              <div className="flex gap-3">
                <FormControl id="permanentAddress" className="w-1/2">
                  <FormLabel>Permanent Address</FormLabel>
                  <Input
                    name="permanentAddress"
                    onChange={handleChange}
                    className="h-16"
                  />
                </FormControl>
                <FormControl id="correspondenceAddress" className="w-1/2">
                  <FormLabel>Correspondence Address</FormLabel>
                  <Input
                    name="correspondenceAddress"
                    onChange={handleChange}
                    className="h-16"
                  />
                </FormControl>
              </div>
            </TabPanel>

            <TabPanel>
              <div className="flex gap-3">
                <FormControl id="guardianDetails.guardianName">
                  <FormLabel>Guardian Name</FormLabel>
                  <Input
                    name="guardianDetails.guardianName"
                    onChange={handleChange}
                  />
                </FormControl>
                <FormControl id="guardianDetails.guardianContactNo">
                  <FormLabel>Guardian Contact Number</FormLabel>
                  <Input
                    name="guardianDetails.guardianContactNo"
                    onChange={handleChange}
                  />
                </FormControl>
              </div>
            </TabPanel>

            <TabPanel>
              <div className="flex gap-3">
                <FormControl id="bankDetails.bankName">
                  <FormLabel>Bank Name </FormLabel>
                  <Input name="bankDetails.bankName" onChange={handleChange} />
                </FormControl>
                <FormControl id="bankDetails.bankAccountNo">
                  <FormLabel>Bank Account Number </FormLabel>
                  <Input
                    name="bankDetails.bankAccountNo"
                    onChange={handleChange}
                  />
                </FormControl>
              </div>
              <div className="flex gap-3">
                <FormControl id="bankDetails.bankIfscCode">
                  <FormLabel>Bank IFSC Code </FormLabel>
                  <Input
                    name="bankDetails.bankIfscCode"
                    onChange={handleChange}
                  />
                </FormControl>
                <FormControl id="bankDetails.type">
                  <FormLabel>Bank Type </FormLabel>
                  <Input name="bankDetails.type" onChange={handleChange} />
                </FormControl>
              </div>
              <Button type="submit" colorScheme="purple" className="mt-5">
                Create Employee
              </Button>
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
                <FormControl id="title" maxWidth={130}>
                  <FormLabel>Title</FormLabel>
                  <Select
                    placeholder="Select Title"
                    onChange={(value) => handleSelectOption("title", value)}
                  ></Select>
                  <Select.Option name="title" value="Mr.">
                    Mr.
                  </Select.Option>
                  <Select.Option name="title" value="Mrs.">
                    Mrs.
                  </Select.Option>
                </FormControl>

                <FormControl id="employeeName">
                  <FormLabel>Employee Name</FormLabel>
                  <Input name="name" onChange={handleChange}  />
                </FormControl>

                <FormControl id="gender" maxWidth={150}>
                  <FormLabel>Gender</FormLabel>
                  <Select
                    style={{ width: "100%" }}
                    name="gender"
                    onChange={(value) => handleSelectOption("gender", value)}
                    placeholder="Select gender"
                  >
                    <Select.Option value="Male">Male</Select.Option>
                    <Select.Option value="Female">Female</Select.Option>
                    <Select.Option value="Others">Others</Select.Option>
                  </Select>
                </FormControl>

                <FormControl id="contactNo">
                  <FormLabel>Contact Number</FormLabel>
                  <Input name="contactNo" onChange={handleChange} />
                </FormControl>
                <FormControl id="dob" maxWidth={150}>
                  <FormLabel>DOB</FormLabel>
                  <MyDatePicker
                    selected={projectData.dob}
                    onChange={(date) =>
                      setProjectData({ ...projectData, dob: date })
                    }
                    format={"DD/MM/YYYY"}
                  />
                  {projectData?.dob?._d && <>{`${projectData?.dob?._d}`}</>}
                </FormControl>
              </div>
              <div className="flex gap-3 mb-3">
                <FormControl id="position">
                  <FormLabel>Position</FormLabel>
                  <Input name="position" onChange={handleChange} />
                </FormControl>
                <FormControl id="designation">
                  <FormLabel>Designation</FormLabel>
                  <Input
                    name="designation"
                    onChange={handleChange}
                  />
                </FormControl>
              </div>

              <div className="flex flex-col gap-3 mb-3">
                <FormControl id="department" maxWidth={500}>
                  <FormLabel>Department</FormLabel>
                  <Input name="department" onChange={handleChange} />
                </FormControl>
                <FormControl id="email" maxWidth={350}>
                  <FormLabel>Email</FormLabel>
                  <Input name="email" onChange={handleChange} />
                </FormControl>
                <FormControl id="password" maxWidth={350}>
                  <FormLabel>Password</FormLabel>
                  <Input name="password" onChange={handleChange} />
                </FormControl>
              </div>

              <div className="flex gap-3">
                <FormControl id="joiningDate" maxWidth={300}>
                  <FormLabel>Joining Date</FormLabel>
                  <MyDatePicker
                    selected={projectData.joiningDate}
                    onChange={(date) =>
                      setProjectData({ ...projectData, joiningDate: date })
                    }
                    format={"DD/MM/YYYY"}
                  />
                  {projectData?.joiningDate?._d && <>{joiningDate}</>}
                </FormControl>
                <FormControl id="manager_id">
                  <FormLabel>Assigned Manager</FormLabel>
                  <select
                    onChange={handleSelectManager}
                    value={projectData.manager_id}
                  >
                    <option value="">Select Manager</option>
                    {managers.map((manager, index) => (
                      <option key={`manager-${index}`} value={manager.id}>
                        {manager.name}
                      </option>
                    ))}
                  </select>
                </FormControl>
              </div>
            </TabPanel>
            <TabPanel>
              <div className="flex gap-3 mb-3 flex-col md:flex-row">
                <FormControl id="permanentAddress" className="w-1/2">
                  <FormLabel>Permanent Address</FormLabel>
                  <Input
                    name="permanentAddress"
                    onChange={handleChange}
                    className="h-16"
                  />
                </FormControl>
                <FormControl id="correspondenceAddress" className="w-1/2">
                  <FormLabel>Correspondence Address</FormLabel>
                  <Input
                    name="correspondenceAddress"
                    onChange={handleChange}
                    className="h-16"
                  />
                </FormControl>
                <FormControl id="guardianDetails.guardianName">
                  <FormLabel>Guardian Name</FormLabel>
                  <Input
                    name="guardianDetails.guardianName"
                    onChange={handleChange}
                  />
                </FormControl>
                <FormControl id="guardianDetails.guardianContactNo">
                  <FormLabel>Guardian Contact Number</FormLabel>
                  <Input
                    name="guardianDetails.guardianContactNo"
                    onChange={handleChange}
                  />
                </FormControl>
                <FormControl id="bankDetails.bankName">
                  <FormLabel>Bank Name </FormLabel>
                  <Input name="bankDetails.bankName" onChange={handleChange} />
                </FormControl>
                <FormControl id="bankDetails.bankAccountNo">
                  <FormLabel>Bank Account Number </FormLabel>
                  <Input
                    name="bankDetails.bankAccountNo"
                    onChange={handleChange}
                  />
                </FormControl>
                <FormControl id="bankDetails.bankIfscCode">
                  <FormLabel>Bank IFSC Code </FormLabel>
                  <Input
                    name="bankDetails.bankIfscCode"
                    onChange={handleChange}
                  />
                </FormControl>
                <FormControl id="bankDetails.type">
                  <FormLabel>Bank Type </FormLabel>
                  <Input name="bankDetails.type" onChange={handleChange} />
                </FormControl>
              </div>

              <Button type="submit" colorScheme="purple" className="mt-5">
                Create Employee
              </Button>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </div>
    </form>
  );
};

export default Emp;
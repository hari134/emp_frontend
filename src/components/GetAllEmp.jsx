import { useState, useEffect } from "react";
import {
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  useDisclosure,
  Spinner, 
} from "@chakra-ui/react";
import axios from "axios";
import InfoModal from "./common/InfoModal";
import TableContainer from "./common/TableContainer";
import { Empty } from "antd";
import { Link } from "react-router-dom";
import { GoPlus } from "react-icons/go"; 
import { toast } from "react-toastify";
import { DeleteIcon } from "@chakra-ui/icons";

const GetAllEmp = () => {
  const [employees, setEmployees] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [isLoading, setIsLoading] = useState(true); 

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE}/api/admin/getAllEmployees`
        );
        setEmployees(response.data);
        setIsLoading(false); 
      } catch (error) {
        console.error("Error fetching data:", error);
        setIsLoading(false); 
      }
    }
    fetchData();
  }, []);

  const handleMoreInfo = (employee) => {
    setSelectedEmployee(employee);
    onOpen();
  };

  const handleDeleteEmployee = async (employeeId) => {
    try {
      await axios.delete(
        `${
          import.meta.env.VITE_API_BASE
        }/api/admin/deleteEmployeeById/${employeeId}`
      );
      toast.success("Successfully deleted employee")
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE}/api/admin/getAllEmployees`
      );
      setEmployees(response.data);
    } catch (error) {
      console.error("Error deleting employee:", error);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Spinner size="xl" color="purple.500" />
      </div>
    );
  }

  return (
    <>
      <div className="w-full p-8">
        <h1 className="text-4xl font-bold mb-4">Employee Information</h1>
        <Link to="/CreateEmp">
          <Button
            colorScheme="blue"
            _hover={{ bg: "blue.600" }}
            mb="2"
            className="flex gap-2 items-center"
          >
            <GoPlus /> Add an Employee
          </Button>
        </Link>
        {employees.length === 0 ? (
          <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            description={<span>No Employee Data</span>}
          />
        ) : (
          <TableContainer
            searchText={searchText}
            setSearchText={setSearchText}
            setFilteredData={setFilteredEmployees}
            data={employees}
          >
            <Thead bg={"#F1F5F9"}>
              <Tr>
                <Th fontWeight="bold">S. No.</Th>
                <Th fontWeight="bold">Name</Th>
                <Th fontWeight="bold" className="md:table-cell hidden">
                  Position
                </Th>
                <Th fontWeight="bold" className="md:table-cell hidden">
                  Department
                </Th>
                <Th fontWeight="bold" className="md:table-cell hidden">
                  Joining Date
                </Th>
                <Th fontWeight="bold">Action</Th>
              </Tr>
            </Thead>
            <Tbody>
              {searchText !== ""
                ? filteredEmployees.map((emp, index) => (
                    <Tr key={emp._id}>
                      <Td>{index + 1}</Td>
                      <Td>{emp.name}</Td>
                      <Td className="md:table-cell hidden">{emp.position}</Td>
                      <Td className="md:table-cell hidden">{emp.department}</Td>
                      <Td className="md:table-cell hidden">
                        {emp.joiningDate}
                      </Td>
                      <Td>
                        <Button
                          size={"sm"}
                          colorScheme="purple"
                          onClick={() => handleMoreInfo(emp)}
                        >
                          More Info
                        </Button>
                        <Button
                          size={"sm"}
                          variant={"outline"}
                          colorScheme="red"
                          ml={2}
                          onClick={() => handleDeleteEmployee(emp.employee._id)}
                        >
                          <DeleteIcon />
                        </Button>
                      </Td>
                    </Tr>
                  ))
                : employees.map((emp, index) => (
                    <Tr key={emp._id}>
                      <Td>{index + 1}</Td>
                      <Td>{emp.name}</Td>
                      <Td className="md:table-cell hidden">{emp.position}</Td>
                      <Td className="md:table-cell hidden">{emp.department}</Td>
                      <Td className="md:table-cell hidden">
                        {emp.joiningDate}
                      </Td>
                      <Td>
                        <Button
                          size={"sm"}
                          colorScheme="purple"
                          onClick={() => handleMoreInfo(emp)}
                        >
                          More Info
                        </Button>
                        <Button
                          size={"sm"}
                          variant={"outline"}
                          colorScheme="red"
                          ml={2}
                          onClick={() => handleDeleteEmployee(emp.employee._id)}
                        >
                          <DeleteIcon />
                        </Button>
                      </Td>
                    </Tr>
                  ))}
            </Tbody>
          </TableContainer>
        )}
      </div>

      <InfoModal
        modalFor="employee"
        data={selectedEmployee}
        onClose={onClose}
        isOpen={isOpen}
      />
    </>
  );
};

export default GetAllEmp;

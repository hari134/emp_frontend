import React, { useState, useEffect } from "react";
import {
  Select,
  Stack,
  Input,
  Button,
  FormControl,
  FormLabel,
  Card,
  CardBody,
  Text,
} from "@chakra-ui/react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ToastContainer, toast } from "react-toastify";
import MyDatePicker from "../common/MyDatePicker";
import { PiArrowsLeftRightFill } from "react-icons/pi";
import { FaPlus, FaTrashCan } from "react-icons/fa6";

const Invoice = () => {
  const [clients, setClients] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedClient, setSelectedClient] = useState("");
  const [selectedGst, setSelectedGst] = useState(0);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [services, setServices] = useState([]);

  useEffect(() => {
    fetchClients();
    fetchProducts();
  }, []);

  const fetchClients = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE}/api/admin/getAllClients`
      );
      const data = await response.json();
      setClients(data);
    } catch (error) {
      console.error("Error fetching clients:", error);
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE}/api/admin/getAllProducts`
      );
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleClientChange = (event) => {
    const _id = event.target.value;
    const selectedClient = clients.find((client) => client._id === _id);
    setSelectedClient(selectedClient);
  };

  const handleProductSelect = (event) => {
    const productId = event.target.value;
    const selectedProduct = products.find(
      (product) => product._id === productId
    );
    setSelectedProducts([...selectedProducts, selectedProduct]);
  };

  const handleServiceChange = (index, field, value) => {
    const updatedServices = [...services];
    if (field === "productId") {
      const selectedProduct = products.find((product) => product._id === value);

      updatedServices[index]["product"] = selectedProduct;
    } else {
      updatedServices[index][field] = value;
    }
    setServices(updatedServices);
  };

  const handleAddService = () => {
    setServices([
      ...services,
      {
        product: "",
        serviceDescription: "",
        duration: "",
        quantity: 1,
        unitPrice: 0,
        startDate: "",
        endDate: "",
      },
    ]);
  };

  const handleRemoveService = (index) => {
    const updatedServices = [...services];
    updatedServices.splice(index, 1);
    setServices(updatedServices);
  };

  const handleSubmit = async () => {
    const requestData = {
      client_id: selectedClient.client_id,
      gst: parseInt(selectedGst),
      services: services.map((service) => ({
        product: service.product.product,
        serviceDescription: service.serviceDescription,
        duration: service.duration,
        quantity: service.quantity,
        unitPrice: service.product.unitPrice,
        startDate: service.startDate.toISOString(),
        endDate: service.endDate.toISOString(),
      })),
    };

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE}/api/admin/createInvoice`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestData),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to download Invoice slip");
      }

      const pdfBlob = await response.blob();
      const fileURL = URL.createObjectURL(pdfBlob);
      const link = document.createElement("a");
      link.href = fileURL;
      link.setAttribute("download", "invoice_slip.pdf");
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);

      toast.success("Invoice Slip is downloaded successfully.");
    } catch (error) {
      console.error("Error creating invoice:", error);
      toast.error("Failed to download Invoice slip.");
    }
  };


  return (
    <Stack spacing={4}>
      <FormControl maxWidth={300}>
        <FormLabel>Select Client</FormLabel>
        <Select placeholder="Select client" onChange={handleClientChange}>
          {clients.map((client) => (
            <option key={client._id} value={client._id}>
              {client.brandName}
            </option>
          ))}
        </Select>
      </FormControl>
      {selectedClient && (
        <Card variant={"outline"}>
          <CardBody>
            <Text textTransform={"capitalize"}>Client Name: {selectedClient.clientName}</Text>
            <Text>Client Company: {selectedClient.companyName}</Text>
          </CardBody>
        </Card>
      )}
      <FormControl maxWidth={50}>
        <FormLabel>GST</FormLabel>
        <Input
          type="number"
          placeholder="Enter GST"
          value={selectedGst}
          onChange={(e) => setSelectedGst(e.target.value)}
        />
      </FormControl>


      {services.length > 0 &&
        <div className={`flex gap-4 w-full overflow-x-scroll pt-4 pb-8`}>
          {services.map((service, index) => (
            <Card key={index} rounded={"xl"} shadow={"md"} className="w-[300px]">
              <CardBody>
                <div
                  onClick={() => handleRemoveService(index)}
                  className="flex items-center justify-center w-10 h-10 hover:bg-red-600 transition-all bg-red-500 text-white gap-2 rounded-full mb-4 cursor-pointer"
                >
                  <FaTrashCan />
                </div>

                <FormControl maxWidth={300}>
                  <FormLabel>Select Product</FormLabel>
                  <Select
                    placeholder="Select product"
                    onChange={(e) =>
                      handleServiceChange(index, "productId", e.target.value)
                    }
                    value={service.productId}
                  >
                    {products.map((product) => (
                      <option key={product._id} value={product._id}>
                        {product.product} - Unit Price - {product.unitPrice}
                      </option>
                    ))}
                  </Select>
                </FormControl>

                <FormControl mt={4}>
                  <FormLabel>Service Description</FormLabel>
                  <Input
                    value={service.serviceDescription}
                    onChange={(e) =>
                      handleServiceChange(
                        index,
                        "serviceDescription",
                        e.target.value
                      )
                    }
                  />
                </FormControl>

                <div className="flex gap-4 items-center mt-4">
                  <FormControl maxWidth={100}>
                    <FormLabel>Start Date</FormLabel>
                    <MyDatePicker
                      selected={service.startDate}
                      onChange={(date) =>
                        handleServiceChange(index, "startDate", date)
                      } // Corrected to use 'date' instead of 'startDate'
                    />
                  </FormControl>
                  <PiArrowsLeftRightFill size={20} />
                  <FormControl maxWidth={100}>
                    <FormLabel>End Date</FormLabel>
                    <MyDatePicker
                      selected={service.endDate}
                      onChange={(date) => handleServiceChange(index, "endDate", date)} // Corrected to use 'date' instead of 'endDate'
                    />
                  </FormControl>
                </div>

                <div className="flex gap-4 items-center mt-4">
                  <FormControl maxWidth={100}>
                    <FormLabel>Quantity</FormLabel>
                    <Input
                      type="number"
                      value={service.quantity}
                      onChange={(e) =>
                        handleServiceChange(index, "quantity", e.target.value)
                      }
                    />
                  </FormControl>
                  <FormControl maxWidth={100}>
                    <FormLabel>Duration</FormLabel>
                    <Input
                      type="text"
                      value={service.duration}
                      onChange={(e) =>
                        handleServiceChange(index, "duration", e.target.value)
                      }
                    />
                  </FormControl>
                </div>
              </CardBody>
            </Card>
          ))}
          <div onClick={handleAddService}
            className="border-[1px] w-[300px] transition-all hover:shadow-lg hover:bg-gray-50 rounded-lg border-gray-100 text-gray-400 flex flex-col gap-4 items-center justify-center cursor-pointer">
            <FaPlus size={40} />
            Add Service
          </div>
        </div>
      }

      {(services.length === 0 && selectedClient) && <Button onClick={handleAddService} variant={"outline"} colorScheme="purple">Add Service</Button>}
      <Button onClick={handleSubmit} colorScheme="purple">Create Invoice</Button>
    </Stack>
  );
};

export default Invoice;
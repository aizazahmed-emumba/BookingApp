import * as React from "react";
import { FormControl, useFormControlContext } from "@mui/base/FormControl";
import { Input, inputClasses } from "@mui/base/Input";
import { styled } from "@mui/system";
import clsx from "clsx";
import { useForm, Controller, Control, useFieldArray } from "react-hook-form";
import { Button } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import AutoCompleteLocation from "../AutoComplete/AutoCompleteLocation";
import { Result } from "../AutoComplete/AutoCompleteLocation";
import { yupResolver } from "@hookform/resolvers/yup";
import addTourSchema from "../../VlidationSchema/AddTourSchema";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

interface FormValues {
  name: string;
  price: number;
  duration: number;
  description: string;
  start_date: string;
  end_date: string;
  file: any;
  facilities: { name: string }[];
}

export default function BasicFormControl() {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(addTourSchema),
  });

  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    if (errors) {
      Object.entries(errors).forEach(([fieldName, error]) => {
        if (fieldName === "facilities") {
          toast.error("Facilities is required");
        } else if (error) {
          toast.error(error?.message as string);
        }
      });
    }
  }, [errors]);

  const navigate = useNavigate();
  const [selectedLocation, setSelectedLocation] = React.useState<Result | null>(
    null
  );

  const { fields, append, remove } = useFieldArray({
    control,
    name: "facilities",
  });

  const onSubmit = async (data: FormValues) => {
    if (!selectedLocation) {
      toast.error("Please Select a Location");
      console.error("Please Select a Location");
      return;
    }

    setIsLoading(true);

    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("city", selectedLocation?.name || "");
    formData.append("price", data.price.toString());
    formData.append("duration", data.duration.toString());
    formData.append("description", data.description);
    formData.append("start_date", data.start_date);
    formData.append("end_date", data.end_date);
    formData.append("facilities", JSON.stringify(data.facilities));
    formData.append("file", data.file[0]);

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      withCredentials: true,
    };

    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/tour/createTour`,
        formData,
        config
      );
      console.log(response);

      if (response.status === 201) {
        navigate("/TourDetail/" + response.data._id);
        toast.success("Tour Created Successfully");
      }
    } catch (error: any) {
      toast.error("Error Creating Tour");
      toast.error(error.response.data.message);
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      className="flex flex-col gap-5  md:w-[70%]"
      onSubmit={handleSubmit(onSubmit)}
    >
      <FormControlWithHookForm
        control={control}
        name="name"
        label="Name"
        type="text"
        placeholder="Enter Tour Name here"
      />

      {/* <FormControlWithHookForm
        control={control}
        name="city"
        label="city"
        type="text"
        placeholder="Enter Your city here"
      /> */}

      <div>
        <AutoCompleteLocation
          selectedLocation={selectedLocation}
          setSelectedLocation={setSelectedLocation}
        />
      </div>

      <FormControlWithHookForm
        control={control}
        name="description"
        label="Description"
        type="text"
        placeholder="Enter descriptions"
      />

      <FormControlWithHookForm
        control={control}
        name="price"
        label="Price"
        type="number"
        placeholder="Enter price"
      />

      <FormControlWithHookForm
        control={control}
        name="duration"
        type="number"
        label="Duration"
        placeholder="Enter duration number"
      />

      <FormControlWithHookForm
        control={control}
        name="start_date"
        type="date"
        label="Start Date"
        placeholder="Enter start date"
      />

      <FormControlWithHookForm
        control={control}
        name="end_date"
        type="date"
        label="End Date"
        placeholder="Enter end date"
      />

      <label>Upload Picture</label>

      <input type="file" {...register("file")} />

      <div>
        <label>List of Facilites</label>
        <div className="flex flex-col gap-5">
          {fields.map((facility, index) => (
            <div key={facility.id} className="flex justify-between w-full ">
              <StyledInput
                placeholder={`Enter facility name`}
                type="text"
                {...register(`facilities.${index}.name` as const)}
                defaultValue={facility.name}
              />
              {index > 0 && (
                <Button
                  variant="contained"
                  color="error"
                  type="button"
                  onClick={() => remove(index)}
                >
                  Delete
                </Button>
              )}
            </div>
          ))}
          <Button
            variant="contained"
            color="primary"
            type="button"
            onClick={() => append({ name: "" })}
            className="mt-5 w-1/2 "
          >
            Add Facility
          </Button>
        </div>
      </div>

      <Button
        disabled={isLoading}
        variant="contained"
        size="large"
        color="warning"
        type="submit"
        className="md:w-[70%] w-full"
      >
        Submit
      </Button>
    </form>
  );
}

interface FormControlWithHookFormProps {
  control: Control<FormValues>;
  name: keyof FormValues;
  label: string;
  placeholder: string;
  width?: string;
  type: string;
}

const FormControlWithHookForm: React.FC<FormControlWithHookFormProps> = ({
  control,
  name,
  label,
  placeholder,
  width,
  type,
}) => (
  <FormControl defaultValue="" required>
    <Label className="text-gray-500">{label}</Label>
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <StyledInput
          {...field}
          type={type}
          placeholder={placeholder}
          width={width}
        />
      )}
    />
    <HelperText />
  </FormControl>
);

const StyledInput = styled(Input)(
  ({ theme }) => `
  .${inputClasses.input} {
    width: ${"100%"};
    font-family: 'IBM Plex Sans', sans-serif;
    font-size: 0.875rem;
    font-weight: 400;
    line-height: 1.5;
    padding: 8px 12px;
    border-radius: 8px;
    color: ${theme.palette.mode === "dark" ? grey[300] : grey[900]};
    background: ${theme.palette.mode === "dark" ? grey[900] : "#fff"};
    border: 1px solid ${theme.palette.mode === "dark" ? grey[700] : grey[200]};
    box-shadow: 0px 2px 2px ${
      theme.palette.mode === "dark" ? grey[900] : grey[50]
    };

    &:hover {
      border-color: ${blue[400]};
    }

    &:focus {
      outline: 0;
      border-color: ${blue[400]};
      box-shadow: 0 0 0 3px ${
        theme.palette.mode === "dark" ? blue[600] : blue[200]
      };
    }
  }
`
);

const Label = styled(
  ({
    children,
    className,
  }: {
    children?: React.ReactNode;
    className?: string;
  }) => {
    const formControlContext = useFormControlContext();
    const [dirty, setDirty] = React.useState(false);

    React.useEffect(() => {
      if (formControlContext?.filled) {
        setDirty(true);
      }
    }, [formControlContext]);

    if (formControlContext === undefined) {
      return <p>{children}</p>;
    }

    const { error, required, filled } = formControlContext;
    const showRequiredError = dirty && required && !filled;

    return (
      <p
        className={clsx(className, error || showRequiredError ? "invalid" : "")}
      >
        {children}
        {required ? " *" : ""}
      </p>
    );
  }
)`
  font-family: "IBM Plex Sans", sans-serif;
  font-size: 0.875rem;
  margin-bottom: 4px;

  &.invalid {
    color: red;
  }
`;

const HelperText = styled((props: {}) => {
  const formControlContext = useFormControlContext();
  const [dirty, setDirty] = React.useState(false);

  React.useEffect(() => {
    if (formControlContext?.filled) {
      setDirty(true);
    }
  }, [formControlContext]);

  if (formControlContext === undefined) {
    return null;
  }

  const { required, filled } = formControlContext;
  const showRequiredError = dirty && required && !filled;

  return showRequiredError ? <p {...props}>This field is required.</p> : null;
})`
  font-family: "IBM Plex Sans", sans-serif;
  font-size: 0.875rem;
`;

const blue = {
  100: "#DAECFF",
  200: "#b6daff",
  400: "#3399FF",
  500: "#007FFF",
  600: "#0072E5",
  900: "#003A75",
};

const grey = {
  50: "#F3F6F9",
  100: "#E5EAF2",
  200: "#DAE2ED",
  300: "#C7D0DD",
  400: "#B0B8C4",
  500: "#9DA8B7",
  600: "#6B7A90",
  700: "#434D5B",
  800: "#303740",
  900: "#1C2025",
};

import * as React from "react";
import { FormControl, useFormControlContext } from "@mui/base/FormControl";
import { Input, inputClasses } from "@mui/base/Input";
import { styled } from "@mui/system";
import clsx from "clsx";
import { useForm, Controller, Control, useFieldArray } from "react-hook-form";
import { Button } from "@mui/material";
import axios from "axios";
import toast from "react-hot-toast";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

import AutoCompleteLocation, {
  Result,
} from "../AutoComplete/AutoCompleteLocation";

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

type Props = {
  id: string;
  city: string;
  description: string;
  duration: number;
  facilitiesInitialValues: string[];
  name: string;
  price: number;
  startDate: string;
  endDate: string;
};

const BasicFormControl: React.FC<Props> = ({
  id,
  description,
  duration,
  endDate,
  facilitiesInitialValues,
  name,
  price,
  startDate,
}) => {
  const { register, control, handleSubmit } = useForm<FormValues>({});

  const [loading, setLoading] = React.useState(false);
  const [selectedLocation, setSelectedLocation] = React.useState<Result | null>(
    null
  );

  const { fields, append, remove } = useFieldArray({
    control,
    name: "facilities",
  });

  React.useEffect(() => {
    append(facilitiesInitialValues.map((facility) => ({ name: facility })));
  }, []);

  const onSubmit = async (data: FormValues) => {
    if (!selectedLocation) {
      toast.error("Please Select a Location");
      return;
    }

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };

    try {
      setLoading(true);
      const response = await axios.post(
        `${BACKEND_URL}/api/tour/update/${id}`,
        { ...data, city: selectedLocation?.name },
        config
      );
      if (response.status === 200) {
        toast.success("Tour Updated Successfully");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      className="flex flex-col gap-5 justify-centesr items-centers"
      onSubmit={handleSubmit(onSubmit)}
    >
      <FormControlWithHookForm
        defautValue={name}
        control={control}
        name="name"
        label="Name"
        type="text"
        placeholder="Enter Your Name here"
      />

      {/* <FormControlWithHookForm
        defautValue={city}
        control={control}
        name="city"
        label="city"
        type="text"
        placeholder="Enter Your city here"
      /> */}

      <AutoCompleteLocation
        selectedLocation={selectedLocation}
        setSelectedLocation={setSelectedLocation}
      />

      <FormControlWithHookForm
        defautValue={description}
        control={control}
        name="description"
        label="description"
        type="text"
        placeholder="Enter descriptions"
      />

      <FormControlWithHookForm
        defautValue={price.toString()}
        control={control}
        name="price"
        label="price"
        type="number"
        placeholder="Enter price"
      />

      <FormControlWithHookForm
        defautValue={duration.toString()}
        control={control}
        name="duration"
        type="number"
        label="duration"
        placeholder="Enter duration number"
      />

      <FormControlWithHookForm
        defautValue={startDate}
        control={control}
        name="start_date"
        type="date"
        label="start date"
        placeholder="Enter start date"
      />

      <FormControlWithHookForm
        defautValue={endDate}
        control={control}
        name="end_date"
        type="date"
        label="end date"
        placeholder="Enter end date"
      />

      <div>
        <label>List of Facilites</label>
        <div className="flex flex-col gap-5">
          {fields.map((facility, index) => (
            <div key={facility.id} className="flex w-full ">
              <StyledInput
                type="text"
                {...register(`facilities.${index}.name` as const)}
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
        disabled={loading}
        variant="contained"
        size="large"
        color="warning"
        type="submit"
        className="w-[70%]"
      >
        Submit
      </Button>
    </form>
  );
};

export default BasicFormControl;

interface FormControlWithHookFormProps {
  control: Control<FormValues>;
  name: keyof FormValues;
  label: string;
  placeholder: string;
  width?: string;
  type: string;
  defautValue: string;
}

const FormControlWithHookForm: React.FC<FormControlWithHookFormProps> = ({
  control,
  name,
  label,
  placeholder,
  width,
  type,
  defautValue,
}) => (
  <FormControl defaultValue={defautValue} required>
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
  ({ theme, ...props }) => `
  .${inputClasses.input} {
    width: ${props.width || "70%"};
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

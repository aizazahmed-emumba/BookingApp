import * as React from "react";
import { FormControl, useFormControlContext } from "@mui/base/FormControl";
import { styled } from "@mui/system";
import clsx from "clsx";
import { useForm, Controller, Control } from "react-hook-form";
import Select from "react-select";
import { Button, TextField } from "@mui/material";
import { useParams } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import BookingSchema from "../../VlidationSchema/BookingSchema";
import { yupResolver } from "@hookform/resolvers/yup";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

interface FormValues {
  name: string;
  email: string;
  numberOfAdults: number;
  numberOfChildren: number;
  paymentMethod: { label: string; value: string };
}

export default function BasicFormControl() {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      name: "",
      email: "",
      numberOfAdults: 0,
      numberOfChildren: 0,
      paymentMethod: { label: "Credit Card", value: "credit_card" },
    },
    resolver: yupResolver(BookingSchema),
  });
  const { id } = useParams<{ id: string }>();
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    console.log(errors);
    if (errors) {
      Object.entries(errors).forEach(([_, error]) => {
        if (error) {
          toast.error(error?.message as string);
        }
      });
    }
  }, [errors]);

  const onSubmit = async (data: FormValues) => {
    try {
      setLoading(true);
      const resposne = await axios.post(
        `${BACKEND_URL}/api/booking/createBooking/${id}`,
        data
      );

      if (resposne.status === 201) {
        reset();

        toast.success("Booking created successfully");
      }
    } catch (error: any) {
      console.error(error);
      toast.error("Failed to create booking");
      toast.error(error?.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      className="flex flex-col gap-8 justify-center items-centers md:w-[70%]"
      onSubmit={handleSubmit(onSubmit)}
    >
      <FormControlWithHookForm
        control={control}
        name="name"
        label="Name"
        placeholder="Enter Your Name here"
      />

      <FormControlWithHookForm
        control={control}
        name="email"
        label="Email"
        placeholder="Enter Your Email here"
      />

      <div className="md:w-[100%] w-full gap-2 flex flex-row justify-between items-center">
        <FormControlWithHookForm
          control={control}
          name="numberOfAdults"
          label="Number of Adults"
          placeholder=""
          width="100%"
        />

        <FormControlWithHookForm
          control={control}
          name="numberOfChildren"
          label="Number of Children"
          placeholder=""
          width="100%"
        />
      </div>

      <FormControl>
        <Label className="text-gray-500">Payment Method</Label>
        <Controller
          name="paymentMethod"
          control={control}
          render={({ field }) => (
            <Select
              className="md:w-[100%] w-full"
              {...field}
              options={[
                {
                  value: "credit_card",
                  label: "Credit Card",
                },
                {
                  value: "paypal",
                  label: "Paypal",
                },
                {
                  value: "cash",
                  label: "Cash",
                },
              ]}
            />
          )}
        />
      </FormControl>

      <Button
        disabled={loading}
        variant="contained"
        size="large"
        color="warning"
        type="submit"
        className="md:w-[100%]"
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
}

const FormControlWithHookForm: React.FC<FormControlWithHookFormProps> = ({
  control,
  name,
  label,
  placeholder,
}) => (
  <FormControl defaultValue="" required>
    <Label className="text-gray-500">{label}</Label>
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value, name, ref, ...rest } }) => (
        <TextField
          sx={{
            width: "100%",
          }}
          InputProps={{
            sx: {
              borderRadius: "10px",
              width: "100%",
            },
          }}
          variant="outlined"
          size="small"
          {...rest}
          name={name}
          onChange={onChange}
          value={value}
          inputRef={ref}
          placeholder={placeholder}
        />
      )}
    />
    <HelperText />
  </FormControl>
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

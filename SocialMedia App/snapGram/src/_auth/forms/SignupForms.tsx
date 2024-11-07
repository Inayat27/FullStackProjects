import * as z from "zod";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Loader from "@/components/shared/Loader";
import { SignupValidation } from "@/lib/validation";
import logo from "../../assets/images/logo.svg";
import { useToast } from "@/components/ui/use-toast";
import {
  useCreateUserAccount,
  useSignInAccount,
} from "@/lib/react-query/QueriesAndMutations";

function SignupForms() {
  const toast = useToast();

  const { mutateAsync: createUserAccount, isLoading: isCreatingUser } =
    useCreateUserAccount();
  const { mutateAsync: SignInAccount, isLoading: isSignIn } =
    useSignInAccount();

  const form = useForm<z.infer<typeof SignupValidation>>({
    resolver: zodResolver(SignupValidation),
    defaultValues: {
      name: "",
      username: "",
      email: "",
      password: "",
    },
  });

  // Handler
  const handleSignup = async (user: z.infer<typeof SignupValidation>) => {
    const newUser = await createUserAccount(user);
    if (!newUser) {
      return toast({ title: "Sign up failed,please try Again" });
    }
    const session = await SignInAccount({
      email: user.email,
      password: user.password,
    });

    if (!session) {
      return toast({
        title:'Sign in Failed ,Please try Again'
      })
    }
  };
  //   try {
  //     // const newUser = await createUserAccount(user);

  //     if (!newUser) {
  //       // toast({ title: "Sign up failed. Please try again.", });

  //       return;
  //     }

  //     const session = await signInAccount({
  //       email: user.email,
  //       password: user.password,
  //     });

  //     if (!session) {
  //       toast({ title: "Something went wrong. Please login your new account", });

  //       navigate("/sign-in");

  //       return;
  //     }

  //     const isLoggedIn = await checkAuthUser();

  //     if (isLoggedIn) {
  //       form.reset();

  //       navigate("/");
  //     } else {
  //       toast({ title: "Login failed. Please try again.", });

  //       return;
  //     }
  //   } catch (error) {
  //     console.log({ error });
  //   }
  // };
  const isLoading = true;
  return (
    <Form {...form}>
      <div className="sm:w-420 flex-center flex-col ">
        <img src={logo} alt="logo" />

        <h2 className="h3-bold md:h2-bold pt-2 sm:pt-5">
          Create a new account
        </h2>
        <p className="text-light-3 small-medium md:base-regular mt-1">
          To use snapgram, Please enter your details
        </p>

        <form
          onSubmit={form.handleSubmit(handleSignup)}
          className="flex flex-col gap-4 w-full mt-2"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="shad-form_label">Name</FormLabel>
                <FormControl>
                  <Input type="text" className="shad-input" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="shad-form_label">Username</FormLabel>
                <FormControl>
                  <Input type="text" className="shad-input" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="shad-form_label">Email</FormLabel>
                <FormControl>
                  <Input type="email" className="shad-input" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="shad-form_label">Password</FormLabel>
                <FormControl>
                  <Input type="password" className="shad-input" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="shad-button_primary">
            {isCreatingUser ? (
              <div className="flex-center gap-2">
                <Loader /> Loading...
              </div>
            ) : (
              "Sign Up"
            )}
          </Button>

          <p className="text-small-regular text-light-2 text-center mt-2">
            Already have an account?
            <Link
              to="/sign-in"
              className="text-primary-500 text-small-semibold ml-1"
            >
              Log in
            </Link>
          </p>
        </form>
      </div>
    </Form>
  );
}

export default SignupForms;

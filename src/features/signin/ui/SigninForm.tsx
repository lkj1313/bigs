import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signinSchema, type SigninFormValues } from "@/features/signin";
import { useSignin } from "../api/use-signin";
import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
} from "@/shared/ui";
import { AuthFormLayout } from "@/shared/ui";
import { toast } from "sonner";
import { getErrorMessage } from "@/shared/lib";
import { FullScreenLoader } from "@/shared/ui";

export const SigninForm = () => {
  const { mutate, isPending } = useSignin({
    onSuccess: () => {
      toast.success("로그인 성공!");
    },
    onError: (error) => {
      toast.error(getErrorMessage(error));
    },
  });

  const form = useForm<SigninFormValues>({
    resolver: zodResolver(signinSchema),
    defaultValues: { username: "", password: "" },
    mode: "onChange",
  });

  const onSubmit = (data: SigninFormValues) => {
    mutate(data);
  };

  return (
    <AuthFormLayout
      title="로그인"
      footerText="계정이 없으신가요?"
      linkText="회원가입"
      linkTo="/signup"
    >{isPending && <FullScreenLoader message="로그인 중입니다..." />}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>이메일</FormLabel>
                <FormControl>
                  <Input placeholder="example@bigs.or.kr" {...field} />
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
                <FormLabel>비밀번호</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="••••••••" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full h-11 mt-2" disabled={isPending}>
            {isPending ? "로그인 중..." : "로그인"}
          </Button>
        </form>
      </Form>
    </AuthFormLayout>
  );
};
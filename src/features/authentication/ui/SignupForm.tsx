import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { signupSchema, type SignupFormValues, useSignup } from "@/features/authentication";
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
import { getErrorMessage } from "@/shared/lib";
import { AuthFormLayout } from "./AuthFormLayout";
import { FullScreenLoader } from "@/shared/ui/FullScreenLoader";

export const SignupForm = () => {
  const { mutate, isPending } = useSignup({
    onSuccess: () => {
      toast.success("회원가입 성공", {
        description: "회원가입이 완료되었습니다. 로그인 페이지로 이동합니다.",
      });
    },
    onError: (error) => {
      toast.error(getErrorMessage(error));
    },
  });

  const form = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      username: "",
      name: "",
      password: "",
      confirmPassword: "",
    },
    mode: "onChange",
  });

  const onSubmit = (data: SignupFormValues) => {
    mutate(data);
  };

  return (
    <AuthFormLayout
      title="회원가입"
      footerText="이미 계정이 있으신가요?"
      linkText="로그인"
      linkTo="/signin"
    >
      {isPending && <FullScreenLoader message="회원가입 중입니다..." />}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>이메일 (아이디)</FormLabel>
                <FormControl>
                  <Input placeholder="example@bigs.or.kr" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>이름</FormLabel>
                <FormControl>
                  <Input placeholder="홍길동" {...field} />
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
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>비밀번호 확인</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="••••••••" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full h-11 mt-2" disabled={isPending}>
            {isPending ? "가입 요청 중..." : "가입하기"}
          </Button>
        </form>
      </Form>
    </AuthFormLayout>
  );
};
import * as z from "zod";

export const signupSchema = z.object({
  username: z.string().email({ message: "올바른 이메일 형식을 입력해주세요." }),
  name: z.string().min(2, { message: "이름은 2글자 이상이어야 합니다." }),
  password: z.string()
    .min(8, { message: "비밀번호는 8자 이상이어야 합니다." })
    .regex(/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!%*#?&])[A-Za-z\d!%*#?&]{8,}$/, {
      message: "영문, 숫자, 특수문자(!%*#?&)를 최소 1개 이상 포함해야 합니다.",
    }),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "비밀번호가 일치하지 않습니다.",
  path: ["confirmPassword"],
});

export type SignupFormValues = z.infer<typeof signupSchema>;
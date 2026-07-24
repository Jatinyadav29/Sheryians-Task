import { nanoid } from "nanoid";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { MyStore } from "../../Context/MyContext";
import { useNavigate } from "react-router";
import {
  User,
  Mail,
  Lock,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  ShieldCheck,
} from "lucide-react";

const Register = () => {
  let { users, setUsers } = useContext(MyStore);
  let navigate = useNavigate();

  let {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  let formSubmit = (data) => {
    const { confirmPassword, ...submitData } = data;
    let arr = [...users, { ...submitData, id: nanoid() }];

    setUsers(arr);
    localStorage.setItem("users", JSON.stringify(arr));

    reset();
    navigate("/login");
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center p-4 md:p-8 text-white overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat filter brightness-[0.25] contrast-[1.1] scale-105 pointer-events-none"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1920&auto=format&fit=crop')`,
        }}
      />

      <div className="absolute inset-0 bg-radial from-transparent via-black/60 to-black pointer-events-none" />

      <div className="w-full max-w-5xl relative z-10 border border-zinc-800/50 rounded-3xl bg-zinc-950/80 backdrop-blur-xl shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 min-h-155">
        <div className="hidden lg:grid lg:col-span-7 p-6 bg-zinc-900/20 border-r border-zinc-800/50 grid-cols-2 gap-4 items-center">
          <div className="space-y-4">
            <div className="border border-zinc-800/50 rounded-2xl p-5 bg-zinc-950/60 backdrop-blur-sm space-y-2">
              <span className="text-xs font-semibold text-zinc-300 uppercase tracking-wider block">
                Seamless Onboarding
              </span>
              <p className="text-[11px] text-zinc-400 font-light leading-relaxed">
                Join thousands of shoppers enjoying curated modern gear.
              </p>
            </div>
            <div className="aspect-4/5 rounded-2xl overflow-hidden border border-zinc-800/50 bg-zinc-900">
              <img
                src="https://i.pinimg.com/736x/14/cd/37/14cd3762b025549304c79af5e96d6b15.jpg"
                alt="Product Lifestyle"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="space-y-4 pt-8">
            <div className="aspect-4/5 rounded-2xl overflow-hidden border border-zinc-800/50 bg-zinc-900">
              <img
                src="https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=600&auto=format&fit=crop"
                alt="Design Collection"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="border border-zinc-800/50 rounded-2xl p-5 bg-zinc-950/60 backdrop-blur-sm space-y-2">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span className="text-xs font-semibold text-zinc-200">
                  Verified Security
                </span>
              </div>
              <p className="text-[11px] text-zinc-400 font-light leading-relaxed">
                End-to-end encryption for your account credentials.
              </p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-5 p-8 sm:p-10 flex flex-col justify-between space-y-6">
          <div className="space-y-5">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-zinc-800/60 bg-zinc-900/50 text-[11px] font-medium text-zinc-400">
              <Sparkles className="w-3.5 h-3.5 text-zinc-300" />
              <span>201Mart Registration</span>
            </div>

            <div className="space-y-1">
              <h1 className="text-3xl font-bold tracking-tight text-white">
                Create an account
              </h1>
              <p className="text-xs text-zinc-400 font-light leading-relaxed">
                Enter your details below to get started with 201Mart.
              </p>
            </div>

            <form
              onSubmit={handleSubmit(formSubmit)}
              method="post"
              className="space-y-3.5"
            >
              <div className="space-y-1">
                <div className="relative flex items-center">
                  <User className="w-4 h-4 text-zinc-500 absolute left-4 pointer-events-none" />
                  <input
                    {...register("name", {
                      required: "Name is required",
                      setValueAs: (value) => value.trim(),
                      minLength: {
                        value: 3,
                        message: "Please enter full name",
                      },
                      pattern: {
                        value: /^(?=.{2,50}$)[\p{L}]+(?:[ '-][\p{L}]+)*$/u,
                        message: "Please enter valid inputs",
                      },
                    })}
                    type="text"
                    placeholder="Full Name"
                    className="w-full pl-11 pr-4 py-2.5 rounded-2xl bg-zinc-900/50 border border-zinc-800/60 text-xs text-white focus:outline-none transition"
                  />
                </div>
                {errors.name && (
                  <p className="text-[11px] text-red-400 pl-1">
                    {errors.name.message}
                  </p>
                )}
              </div>

              <div className="space-y-1">
                <div className="relative flex items-center">
                  <Mail className="w-4 h-4 text-zinc-500 absolute left-4 pointer-events-none" />
                  <input
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value:
                          /^(?!.*\.\.)(?!.*\.$)[A-Za-z0-9]+([._%+-]?[A-Za-z0-9]+)*@[A-Za-z0-9-]+(\.[A-Za-z0-9-]+)*\.[A-Za-z]{2,}$/,
                        message: "Please enter valid Email",
                      },
                    })}
                    type="email"
                    placeholder="Email address"
                    className="w-full pl-11 pr-4 py-2.5 rounded-2xl bg-zinc-900/50 border text-xs text-white focus:outline-none focus:border-zinc-600 transition"
                  />
                </div>
                {errors.email && (
                  <p className="text-[11px] text-red-400 pl-1">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div className="space-y-1">
                <div className="relative flex items-center">
                  <Lock className="w-4 h-4 text-zinc-500 absolute left-4 pointer-events-none" />
                  <input
                    {...register("password", {
                      required: "Password is required",
                      minLength: {
                        value: 6,
                        message: "Please enter at least 6 Characters",
                      },
                      maxLength: {
                        value: 20,
                        message: "Please enter a shorter password",
                      },
                    })}
                    type="password"
                    placeholder="Password (Min 6 chars)"
                    className="w-full pl-11 pr-4 py-2.5 rounded-2xl bg-zinc-900/50 border text-xs text-white focus:outline-none focus:border-zinc-600 transition"
                  />
                </div>
                {errors.password && (
                  <p className="text-[11px] text-red-400 pl-1">
                    {errors.password.message}
                  </p>
                )}
              </div>

              <div className="space-y-1">
                <div className="relative flex items-center">
                  <CheckCircle2 className="w-4 h-4 text-zinc-500 absolute left-4 pointer-events-none" />
                  <input
                    {...register("confirmPassword", {
                      required: "Please confirm the password",
                      validate: (value) => {
                        return (
                          value === getValues("password") ||
                          "Passwords do not match"
                        );
                      },
                    })}
                    type="password"
                    placeholder="Confirm Password"
                    className="w-full pl-11 pr-4 py-2.5 rounded-2xl bg-zinc-900/50 border text-xs text-white focus:outline-none focus:border-zinc-600 transition"
                  />
                </div>
                {errors.confirmPassword && (
                  <p className="text-[11px] text-red-400 pl-1">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="w-full py-3 px-4 bg-white hover:bg-zinc-200 text-black font-semibold text-xs rounded-2xl transition active:scale-[0.98] cursor-pointer flex items-center justify-center gap-2 mt-2 shadow-lg"
              >
                <span>Create Account</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>

          <div className="pt-3 border-t border-zinc-900/80 text-xs text-zinc-400 flex items-center gap-2">
            <span>Already have an account?</span>
            <button
              type="button"
              onClick={() => {
                navigate("/login");
              }}
              className="font-semibold text-white hover:underline cursor-pointer"
            >
              Sign in
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;

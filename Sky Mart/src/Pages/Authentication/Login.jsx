import { useContext, useState } from "react";
import { MyStore } from "../../Context/MyContext";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { ArrowRight, Lock, Mail, Sparkles, ShieldCheck } from "lucide-react";

const Login = () => {
  const [toggle, setToggle] = useState(true);
  let { users, setCurrentUser } = useContext(MyStore);
  let navigate = useNavigate();
  let {
    register,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  const onSubmit = (data) => {
    let match = users.find((curr) => {
      return data.email === curr.email && data.password === curr.password;
    });

    if (match) {
      setCurrentUser(match);
      localStorage.setItem("currentUser", JSON.stringify(match));
      navigate("/");
    } else {
      setToggle((prev) => !prev);
    }
  };

  return (
    <div className="min-h-screen text-white flex items-center justify-center p-4 md:p-8">
      <div className="w-full max-w-5xl border border-zinc-800/80 rounded-3xl bg-zinc-950/80 backdrop-blur-md shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 min-h-150">
        <div className="lg:col-span-5 p-8 sm:p-12 flex flex-col justify-between space-y-8">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-zinc-800 bg-zinc-900/60 text-[11px] font-medium text-zinc-400">
              <Sparkles className="w-3.5 h-3.5 text-zinc-300" />
              <span>201Mart Portal</span>
            </div>

            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tight text-white">
                Welcome back
              </h1>
              <p className="text-xs text-zinc-400 leading-relaxed">
                {toggle ? (
                  <span>
                    Enter your personal credentials to access your account
                  </span>
                ) : (
                  <span className="text-red-400 font-medium">
                    Incorrect credentials. Please check and try again.
                  </span>
                )}
              </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="space-y-1.5">
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
                    name="email"
                    placeholder="name@example.com"
                    className="w-full pl-11 pr-4 py-3 rounded-2xl bg-zinc-900/60 border border-zinc-800 text-sm text-white focus:outline-none transition"
                  />
                </div>
                {errors.email && (
                  <p className="text-xs text-red-400 pl-1">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div className="space-y-1.5">
                <div className="relative flex items-center">
                  <Lock className="w-4 h-4 text-zinc-500 absolute left-4 pointer-events-none" />
                  <input
                    {...register("password", {
                      required: "Password is required",
                      minLength: {
                        value: 6,
                        message: "Please enter correct Password",
                      },
                      maxLength: {
                        value: 20,
                        message: "Please enter correct password",
                      },
                    })}
                    type="password"
                    name="password"
                    placeholder="Enter your password"
                    className="w-full pl-11 pr-4 py-3 rounded-2xl bg-zinc-900/60 border border-zinc-800 text-sm text-white focus:outline-none transition"
                  />
                </div>
                {errors.password && (
                  <p className="text-xs text-red-400 pl-1">
                    {errors.password.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="w-full py-3.5 px-4 bg-white hover:bg-zinc-200 text-black font-semibold text-xs rounded-2xl transition active:scale-[0.98] cursor-pointer flex items-center justify-center gap-2 mt-2 shadow-lg"
              >
                <span>Sign In</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>

          <div className="pt-4 border-t border-zinc-900 text-xs text-zinc-400 flex items-center gap-2">
            <span>Don't have an account?</span>
            <button
              type="button"
              onClick={() => {
                navigate("/register");
              }}
              className="font-semibold text-white hover:underline cursor-pointer"
            >
              Sign up
            </button>
          </div>
        </div>

        <div className="hidden lg:grid lg:col-span-7 p-6 bg-zinc-900/30 border-l border-zinc-800/80 grid-cols-2 gap-4 items-center">
          <div className="space-y-4">
            <div className="border border-zinc-800/80 rounded-2xl p-5 bg-zinc-950/60 backdrop-blur-sm space-y-2">
              <span className="text-xs font-semibold text-zinc-300 uppercase tracking-wider block">
                Curated Catalog
              </span>
              <p className="text-[11px] text-zinc-400 font-light leading-relaxed">
                Access hand-picked apparel, tech, and modern lifestyle products.
              </p>
            </div>
            <div className="aspect-4/5 rounded-2xl overflow-hidden border border-zinc-800 bg-zinc-900">
              <img
                src="https://i.pinimg.com/736x/53/e2/08/53e208c4dd68574c820a2ffd0fd2d657.jpg"
                alt="Product Showcase 1"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="space-y-4 pt-8">
            <div className="aspect-4/5 rounded-2xl overflow-hidden border border-zinc-800 bg-zinc-900">
              <img
                src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=600&auto=format&fit=crop"
                alt="Product Showcase 2"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="border border-zinc-800/80 rounded-2xl p-5 bg-zinc-950/60 backdrop-blur-sm space-y-2">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span className="text-xs font-semibold text-zinc-200">
                  Secure Access
                </span>
              </div>
              <p className="text-[11px] text-zinc-400 font-light leading-relaxed">
                Encrypted session authentication protecting your preferences.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

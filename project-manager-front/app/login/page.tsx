import FormSwticher from "@/components/login/FormSwticher";
import Image from "next/image";

export default function page() {
  return (
    <div className="grid grid-cols-2 flex-1">
      <FormSwticher />
      <div className="flex-1 bg-slate-900 rounded-2xl flex items-center justify-center">
        <Image
          src={"/login_banner.svg"}
          alt="First Banner for login"
          width={520}
          height={600}
          priority={true}
          fetchPriority="high"
        />
      </div>
    </div>
  );
}

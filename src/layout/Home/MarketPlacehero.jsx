import { Button } from "@/components/ui/button.jsx";
import { Badge } from "@/components/ui/badge.jsx";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import Container from "../../components/ui/Container";
const MarketplaceHero = () => {
  return (
    <section className="w-full bg-background text-foreground border-b py-12 md:py-16">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">

          {/* LEFT CONTENT */}
          <div>
            <Badge className="mb-4" variant="secondary">
              Back to College Essentials
            </Badge>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
              Everything you need for <br />
              your <span className="text-indigo-600">workspace</span>
            </h1>

            <p className="mt-4 text-muted-foreground max-w-lg">
              Shop writing instruments, notebooks, desk accessories, and
              everyday stationery trusted by students and professionals.
            </p>

            <div className="flex gap-4 p-6 ">
              <Link to="/shop" className="">
               <Button

  variant="default"
  className="h-12 px-6 inline-flex items-center gap-2"
>
  Shop Now <ArrowRight size={18} />
</Button>



              </Link>

              <Link to="/categories" className="p">
            <Button
  size="lg"
  variant="outline"
  className="h-12 px-6 inline-flex items-center"
>
  Browse Categories
</Button>
              </Link>
            </div>
          </div>

          {/* RIGHT IMAGE */}
          <div className="rounded-xl overflow-hidden border bg-muted">
       <img
  src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1400&q=80"
  alt="Modern workspace with stationery"
  className="w-full h-[260px] md:h-[320px] object-cover"
 />


          </div>

        </div>
      </Container>
    </section>
  );
};


export default MarketplaceHero;

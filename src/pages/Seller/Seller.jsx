import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Store, 
  UserPlus, 
  LogIn, 
  Package, 
  CheckCircle, 
  Clock,
  Mail,
  User,
  TrendingUp,
  Users,
  Shield,
  Zap,
  ArrowRight,
  Sparkles,
  IndianRupee
} from "lucide-react";

const Seller = () => {
  const sellerDetail = useSelector(state => state.seller.sellerInfo);

  return (
    <div className='min-h-screen bg-gradient-to-br from-primary/5 via-background to-primary/10 relative'>
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>

      <div className='relative z-10 min-h-screen px-4 py-16'>
        {!sellerDetail ? (
          /* Not Logged In - Enhanced Landing */
          <div className='max-w-7xl mx-auto'>
            {/* Hero Section */}
            <div className='text-center mb-16 space-y-6'>
              <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full text-primary text-sm font-medium mb-4 border border-primary/20">
                <Sparkles className="w-4 h-4" />
                Join Our Seller Community
              </div>
              
              <h1 className='text-5xl md:text-6xl font-black text-foreground leading-tight'>
                Become a
                <span className='block bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent mt-2'>
                  Verified Seller
                </span>
              </h1>
              
              <p className='text-xl text-muted-foreground max-w-2xl mx-auto'>
                Join thousands of sellers and grow your business on India's trusted healthy FMCG marketplace
              </p>

              {/* CTA Buttons */}
              <div className='flex flex-col sm:flex-row gap-4 justify-center items-center pt-6'>
                <Link to='/sellerRegister'>
                  <Button 
                    size="lg" 
                    className='text-lg px-8 py-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 font-semibold group'
                  >
                    <UserPlus className="w-5 h-5 mr-2" />
                    Start Selling Now
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>

                <Link to='/sellerLogin'>
                  <Button 
                    size="lg" 
                    variant="outline"
                    className='text-lg px-8 py-6 rounded-xl font-semibold border-2'
                  >
                    <LogIn className="w-5 h-5 mr-2" />
                    Seller Login
                  </Button>
                </Link>
              </div>
            </div>

            {/* Stats Section */}
            <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-16'>
              {[
                { icon: Users, value: '10,000+', label: 'Active Sellers', color: 'text-blue-600' },
                { icon: Package, value: '50,000+', label: 'Products Listed', color: 'text-green-600' },
                { icon: IndianRupee, value: '10Cr+', label: 'Monthly Sales', color: 'text-purple-600' }
              ].map((stat, idx) => (
                <Card 
                  key={idx}
                  className='hover:shadow-lg transition-all duration-300 hover:scale-105 border-2'
                >
                  <CardContent className='p-6 text-center'>
                    <stat.icon className={`w-12 h-12 ${stat.color} mx-auto mb-3`} />
                    <div className='text-4xl font-black text-foreground mb-1'>{stat.value}</div>
                    <div className='text-muted-foreground font-medium'>{stat.label}</div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Features Grid */}
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mb-16'>
              {[
                {
                  icon: Zap,
                  title: 'Quick Setup',
                  description: 'Get started in minutes with our easy onboarding process',
                  color: 'bg-yellow-500'
                },
                {
                  icon: Shield,
                  title: 'Secure Payments',
                  description: 'Get paid on time with our secure payment gateway',
                  color: 'bg-green-500'
                },
                {
                  icon: TrendingUp,
                  title: 'Grow Your Business',
                  description: 'Reach millions of health-conscious customers',
                  color: 'bg-blue-500'
                },
                {
                  icon: Package,
                  title: 'Easy Shipping',
                  description: 'Integrated with Shiprocket for hassle-free delivery',
                  color: 'bg-purple-500'
                }
              ].map((feature, idx) => (
                <Card 
                  key={idx}
                  className='hover:shadow-lg transition-all duration-300 hover:scale-105 border-2 group'
                >
                  <CardContent className='p-8'>
                    <div className={`w-14 h-14 rounded-xl ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                      <feature.icon className="w-7 h-7 text-white" />
                    </div>
                    <h3 className='text-2xl font-bold text-foreground mb-2'>{feature.title}</h3>
                    <p className='text-muted-foreground text-lg'>{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Benefits Section */}
            <Card className='border-2 shadow-xl'>
              <CardContent className='p-8 md:p-12'>
                <h2 className='text-3xl md:text-4xl font-black text-foreground mb-8 text-center'>
                  Why Sellers Love Us
                </h2>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                  {[
                    'Zero listing fees - Start selling for free',
                    'Dedicated seller support team',
                    'Marketing tools to boost your sales',
                    'Real-time analytics dashboard',
                    'Flexible pricing control',
                    'Fast approval process (1-2 days)',
                    'Multiple payment options',
                    'Seller training & resources'
                  ].map((benefit, idx) => (
                    <div key={idx} className='flex items-start gap-3'>
                      <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                      <span className='text-foreground text-lg'>{benefit}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        ) : (
          /* Logged In - Seller Dashboard */
          <div className='max-w-5xl mx-auto'>
            <Card className='shadow-2xl border-2 overflow-hidden'>
              {/* Header with Gradient */}
              <div className='bg-gradient-to-r from-primary to-primary/80 p-8 text-primary-foreground'>
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h1 className='text-3xl md:text-4xl font-black mb-2'>
                      Welcome back, {sellerDetail.data.user.fullName}! 👋
                    </h1>
                    <p className='text-primary-foreground/90 text-lg'>Your Seller Dashboard</p>
                  </div>
                  {sellerDetail.data.user.approved ? (
                    <Badge className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 text-sm">
                      <CheckCircle className="w-4 h-4 mr-1" />
                      Approved
                    </Badge>
                  ) : (
                    <Badge className="bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 text-sm">
                      <Clock className="w-4 h-4 mr-1" />
                      Pending
                    </Badge>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                  <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-lg p-3">
                    <Mail className="w-5 h-5" />
                    <span className="text-sm">{sellerDetail.data.user.email}</span>
                  </div>
                  <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-lg p-3">
                    <User className="w-5 h-5" />
                    <span className="text-sm">@{sellerDetail.data.user.username}</span>
                  </div>
                </div>
              </div>

              {/* Content */}
              <CardContent className='p-8 space-y-6'>
                {sellerDetail.data.user.approved ? (
                  /* Approved - Show Actions */
                  <div className='space-y-4'>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                      <Link to='/addProduct' className="block">
                        <Card className='bg-gradient-to-br from-primary to-primary/80 text-primary-foreground hover:scale-105 transition-transform cursor-pointer group border-0 shadow-lg'>
                          <CardContent className='p-6'>
                            <Package className="w-12 h-12 mb-3 group-hover:scale-110 transition-transform" />
                            <h3 className='text-2xl font-bold mb-2'>Add Product</h3>
                            <p className='text-primary-foreground/90'>List new products for sale</p>
                          </CardContent>
                        </Card>
                      </Link>

                      <Link to='/sellerDashboard' className="block">
                        <Card className='bg-gradient-to-br from-blue-500 to-cyan-500 text-white hover:scale-105 transition-transform cursor-pointer group border-0 shadow-lg'>
                          <CardContent className='p-6'>
                            <TrendingUp className="w-12 h-12 mb-3 group-hover:scale-110 transition-transform" />
                            <h3 className='text-2xl font-bold mb-2'>Dashboard</h3>
                            <p className='text-white/90'>View sales & analytics</p>
                          </CardContent>
                        </Card>
                      </Link>
                    </div>

                    <Card className='bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200'>
                      <CardContent className='p-6'>
                        <div className='flex items-start gap-4'>
                          <div className='p-3 bg-green-500 rounded-xl'>
                            <CheckCircle className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <h3 className='text-xl font-bold text-green-900 mb-1'>
                              Your account is active!
                            </h3>
                            <p className='text-green-700'>
                              You can now add products and start selling. Good luck! 🚀
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                ) : (
                  /* Pending - Show Status */
                  <Card className='bg-gradient-to-r from-amber-50 to-orange-50 border-2 border-amber-200'>
                    <CardContent className='p-8'>
                      <div className='flex items-start gap-4'>
                        <div className='p-4 bg-amber-500 rounded-xl'>
                          <Clock className="w-8 h-8 text-white" />
                        </div>
                        <div className='flex-1'>
                          <h3 className='text-2xl font-bold text-amber-900 mb-2'>
                            Account Under Review
                          </h3>
                          <p className='text-amber-800 text-lg mb-4'>
                            Your seller account is currently being reviewed by our team. This typically takes 1-2 business days.
                          </p>
                          <Card className='bg-white border-0 shadow-sm'>
                            <CardContent className='p-4 space-y-2'>
                              <p className='text-sm font-semibold text-gray-700'>What happens next?</p>
                              <ul className='text-sm text-gray-600 space-y-1'>
                                <li>✓ We verify your business documents</li>
                                <li>✓ Check your bank account details</li>
                                <li>✓ Approve your seller account</li>
                                <li>✓ You'll receive an email notification</li>
                              </ul>
                            </CardContent>
                          </Card>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default Seller;

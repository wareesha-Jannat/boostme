/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
    remotePatterns: [
      {protocol : 'https', hostname : 'media4.giphy.com', pathname: '/**'},
      {protocol : 'https', hostname : 'res.cloudinary.com', pathname: '/**'} ],
    
  },
 
};

export default nextConfig;

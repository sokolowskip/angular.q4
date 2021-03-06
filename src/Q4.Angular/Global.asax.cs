﻿using System.Web.Http;
using System.Web.Mvc;
using System.Web.Optimization;
using System.Web.Routing;
using AutoMapper;
using AutoMapper.Mappers;
using Q4.Angular.Models;

namespace Q4.Angular
{
    // Note: For instructions on enabling IIS6 or IIS7 classic mode, 
    // visit http://go.microsoft.com/?LinkId=9394801

    public class WebApiApplication : System.Web.HttpApplication
    {
        protected void Application_Start()
        {
            AreaRegistration.RegisterAllAreas();

            WebApiConfig.Register(GlobalConfiguration.Configuration);
            FilterConfig.RegisterGlobalFilters(GlobalFilters.Filters);
            RouteConfig.RegisterRoutes(RouteTable.Routes);
            BundleConfig.RegisterBundles(BundleTable.Bundles);

            RegisterMappings();
        }

        private void RegisterMappings()
        {
            var useless = new ListSourceMapper();
            Mapper.CreateMap<Project, ProjectDTO>();
            Mapper.CreateMap<Feature, FeatureDTO>();
            Mapper.CreateMap<Task, TaskDTO>()
                .ForMember(x => x.FeatureName, x => x.MapFrom(y => y.Feature.Name))
                .ForMember(x => x.ProjectName, x => x.MapFrom(y => y.Feature.Project.Name));
        }


    }
}
ng g module projects --routing

ng g c projects/projectList -d
ng g c projects/projectDetail -d
ng g c projects/projectEdit -d
ng g c projects/project-edit/ProjectEditInfo -d
ng g c projects/project-edit/ProjectEditTags -d

ng g service projects/project
ng g service projects/projectParameter


ng g c home/shell -d
ng g c home/Welcome -d
ng g c home/PageNotFound -d
ng g c home/menu -d

ng g module shared -d
ng g c shared/auth/signup
ng g c shared/auth/signin

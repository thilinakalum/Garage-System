/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.care_point.service.job_card;

import com.mac.care_point.service.job_card.model.Category;
import com.mac.care_point.service.job_card.model.CategoryDetail;
import com.mac.care_point.service.job_card.model.Customer;
import com.mac.care_point.service.job_card.model.Description;
import com.mac.care_point.service.job_card.model.InsCompany;
import com.mac.care_point.service.job_card.model.JobSummary;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;
import javax.imageio.ImageIO;
import javax.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

/**
 *
 * @author HP
 */
@CrossOrigin
@RestController
@RequestMapping("/api/care-point/transaction/job-card")
public class JobCardController {

    @Autowired
    private JobCardService jobCardService;

    public static final String IMAGE_LOCATION = "./upload-image";
    public static final String IMAGE_NAME_FILTER_TEMPLATE = "job-no-%s";
    public static final String IMAGE_NAME_TEMPLATE = "job-no-%s-%s.jpg";

    @RequestMapping(value = "/find-by-vehicle/{vehicleNo}", method = RequestMethod.GET)
    public List<JobSummary> findByVehicleNo(@PathVariable("vehicleNo") String vehicleNo) {
        return jobCardService.findByVehicleNo(vehicleNo);
    }

    @RequestMapping(value = "/save-job-card", method = RequestMethod.POST)
    public JobSummary saveJobSummary(@RequestBody JobSummary jobSummary) {
        return jobCardService.saveJobSummary(jobSummary);
    }

    @RequestMapping(value = "find-All-customer", method = RequestMethod.GET)
    public List<Customer> findAllCustomer() {
        return jobCardService.findAllCustomer();
    }

    @RequestMapping(value = "/upload-image/{jobNo}/{imageNo}", method = RequestMethod.POST)//, consumes = "multipart/form-data"
    public void saveImage(@RequestParam("file") MultipartFile file, @PathVariable("jobNo") String jobNo, @PathVariable("imageNo") String imageNo) throws IOException {
        File uploadFile = new File(IMAGE_LOCATION, String.format(IMAGE_NAME_TEMPLATE, jobNo, imageNo));
        if (!uploadFile.getParentFile().exists()) {
            uploadFile.getParentFile().mkdirs();
        }

        BufferedImage bufferedImage = ImageIO.read(file.getInputStream());

        ImageIO.write(bufferedImage, "JPG", uploadFile);
    }

    @RequestMapping(value = "/download-image/{fileName:.+}", method = RequestMethod.GET)
    public void downloadImage(@PathVariable String fileName, HttpServletResponse response) throws FileNotFoundException, IOException {
        InputStream inputStream = new FileInputStream(IMAGE_LOCATION + "/" + fileName);
        OutputStream outputStream = response.getOutputStream();

        byte[] bytes = new byte[1024];
        while (inputStream.read(bytes) > 0) {
            outputStream.write(bytes);
        }
        outputStream.flush();
    }

    @RequestMapping(value = "/image-names/{jobCard}", method = RequestMethod.GET)
    public List<String> imageName(@PathVariable String jobCard) {
        File imageDir = new File(IMAGE_LOCATION);

        File[] imageFiles = imageDir.listFiles((File pathname) -> {
            return pathname.getName().startsWith(String.format(IMAGE_NAME_FILTER_TEMPLATE, jobCard));
        });

        List<String> imageFileNames = new ArrayList<>();
        for (File imageFile : imageFiles) {
            imageFileNames.add(imageFile.getName());
        }

        return imageFileNames;
    }

    @RequestMapping(value = "/all-vehicle-makes", method = RequestMethod.GET)
    public List<String> findAllVehicleMakes() {
        return jobCardService.findVehicleMakes();
    }

    @RequestMapping(value = "/all-vehicle-types", method = RequestMethod.GET)
    public List<String> findAllVehicleTypes() {
        return jobCardService.findByVehicleTypes();
    }

    @RequestMapping(value = "/all-vehicle-models", method = RequestMethod.GET)
    public List<String> findAllVehicleModels() {
        return jobCardService.findByVehicleModels();
    }

    @RequestMapping(value = "/all-insurance-companys", method = RequestMethod.GET)
    public List<InsCompany> findAllInsuranceCompanys() {
        return jobCardService.findAllInsuranceCompanys();
    }
    
    @RequestMapping(value = "/all-category",method = RequestMethod.GET)
    public List<Category> findAllCategorys(){
        return jobCardService.findAllCategorys();
    }
    
    @RequestMapping(value = "/all-description",method = RequestMethod.GET)
    public List<Description> findAllDescription(){
        return jobCardService.findAllDescription();
    }
    
    @RequestMapping(value = "/save-description",method = RequestMethod.POST)
    public Description saveDescription(@RequestBody Description description){
        System.out.println("1");
        return jobCardService.saveDescription(description);
    }
    
    @RequestMapping(value = "/all-CategoryDetail/{jobNo}",method = RequestMethod.GET)
    public List<CategoryDetail> findAllCategoryDetail(@PathVariable String jobNo){
        return jobCardService.findAllCategoryDetail(jobNo);
    }
    
    @RequestMapping(value = "/save-category-detail/{jobNo}", method = RequestMethod.POST)
    public CategoryDetail saveCategoryDetails(@RequestBody CategoryDetail categoryDetail,@PathVariable String jobNo) {
        return jobCardService.saveCategoryDetails(categoryDetail,jobNo);
    }
    
    @RequestMapping(value = "/delete-category-detail/{indexNo}", method = RequestMethod.DELETE)
    public Integer deleteCategoryDetails(@PathVariable Integer indexNo) {
        jobCardService.deleteCategoryDetails(indexNo);
        return indexNo;
    }
    
    @RequestMapping(value = "/pending-job-card/{vehicleNo}", method = RequestMethod.GET)
    public List<JobSummary> findPendingJobCard(@PathVariable String vehicleNo ) {
        String status="N";
        return jobCardService.findPendingJobCard(vehicleNo , status);
    }
    
//    @RequestMapping(value = "/delete-c-detail/{indexNo}", method = RequestMethod.DELETE)
//    public Integer deleteItemDepartment(@PathVariable Integer indexNo) {
//        jobCardService.deleteCategoryDetails(indexNo);
//        return indexNo;
//    }
    
    
    //------------------------- TEST -------------------------------
    @RequestMapping(value = "/all-job", method = RequestMethod.GET)
    public List<JobSummary> findAll() {
        return jobCardService.findAllJob();
    }

    @RequestMapping(value = "/all-customer", method = RequestMethod.GET)
    public List<Customer> findAllCustomers() {
        return jobCardService.findAllCustomer();
    }

}

import java.io.File;
import java.io.StringWriter;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;

import freemarker.template.Configuration;
import freemarker.template.Template;
import static spark.Spark.get;
import static spark.Spark.port;
import static spark.Spark.staticFiles;

public class Main {
    public static void main(String[] args) throws Exception {
        port(4567); // or any port you prefer
        staticFiles.externalLocation("public");

        get("/hello", (req, res) -> "Hello from server!"); 

        Configuration cfg = new Configuration(Configuration.VERSION_2_3_32);
        cfg.setDirectoryForTemplateLoading(new File("templates"));
        cfg.setDefaultEncoding("UTF-8");

        get("/", (req, res) -> {
            Template template = cfg.getTemplate("employee-list.ftl");

            ObjectMapper mapper = new ObjectMapper();
            List<Map<String, Object>> employees = mapper.readValue(
                new File("data/employees.json"),
                new TypeReference<List<Map<String, Object>>>() {}
            );

            Map<String, Object> model = new HashMap<>();
            model.put("employees", employees);

            StringWriter writer = new StringWriter();
            template.process(model, writer);
            return writer.toString();
        });
    }
}

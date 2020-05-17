package org.putholi.batch;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(classes = {BatchServiceApplication.class})
@SpringBootTest(classes = { BatchServiceApplication.class })
@ActiveProfiles("test")
@TestPropertySource(locations = { "/application-test.properties" })
public class BatchServiceApplicationTests {

	@Test
	public void contextLoads() {
	}

}
